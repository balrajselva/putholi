package com.revamp.core.scheduler;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.time.ZonedDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.revamp.core.model.Invoice;
import com.revamp.core.service.InvoiceService;

/*
 * Scheduler looks up invoice table and picks up record(s) that are in 'INVOICEAPPROVED'
 * status and generates payment file.
 * Once invoice file is generated, updates invoice records to 'PAYMENTINTIATED'
 * 
 * 
 */

@Component
public class PaymentScheduler {

	private static final String DELIMIT = "^";

	private static final Logger logger = LoggerFactory.getLogger(PaymentScheduler.class);

	@Value("${payment.fileName}")
	private String fileName;

	@Value("${corporate.code}")
	private String corporateCode;

	@Value("${corporate.account.number}")
	private String corporateAccountNumber;

	@Value("${transaction.currency}")
	private String transactionCurrency;

	@Autowired
	private InvoiceService invoiceService;

	@Scheduled(cron = "${cronExpression}")
	public void findApprovedInvoices() {
		logger.info("Start Invoice Scheduler :{}", ZonedDateTime.now());
		try {
			List<Invoice> invoices = invoiceService.findByInvoiceStatus("INVOICEAPPROVED");
			if (invoices != null) {
				logger.info("Nnumber of invoices in Approved Status : {}", invoices.size());
				createPaymentFile(invoices);
				updateInvoiceRecords(invoices);
			} else {
				logger.warn("There are no invoices in Approved Status");
			}
		} catch (FileNotFoundException e) {
			logger.error("Error creating payment file {}", e.toString());
		}
		logger.info("End Invoice Scheduler :{}", ZonedDateTime.now());
	}

	private void createPaymentFile(List<Invoice> invoices) throws FileNotFoundException {
		File textOutputFile = new File(fileName);
		try (PrintWriter pw = new PrintWriter(textOutputFile)) {
			for (Invoice invoice : invoices) {
				pw.println(toPaymentString(invoice));
			}
		}
	}

	private void updateInvoiceRecords(List<Invoice> invoices) {
		try {
			for (Invoice invoice : invoices) {
				invoiceService.updateStatus(invoice.getId(), 1l, "PAYMENTINITIATED");
			}
		} catch (Exception e) {
			logger.error("Error updating invoice record in payment scheduler");
		}
		logger.info("Invoice records updated to PAYMENTINITIATED");
	}

	// Mappings are done based on file format expected by the bank
	private String toPaymentString(Invoice invoice) {
		StringBuilder builder = new StringBuilder();
		builder.append(invoice.getBankName().equalsIgnoreCase("AXIS") ? "I" : "P").append(DELIMIT) // 1
				.append(invoice.getPaymentMode() != null ? invoice.getPaymentMode() + DELIMIT : DELIMIT) // 2
				.append(corporateCode).append(DELIMIT) // 3
				.append(invoice.getId()).append(DELIMIT) // 4
				.append(corporateAccountNumber).append(DELIMIT) // 5
				.append(invoice.getCreatedDate()).append(DELIMIT) // 6
				.append(transactionCurrency).append(DELIMIT) // 7
				.append(invoice.getTotalAmount() != null ? invoice.getTotalAmount() + DELIMIT : DELIMIT) // 8
				.append(invoice.getCompanyName() != null ? invoice.getCompanyName() + DELIMIT : DELIMIT) // 9
				.append("1000123" + DELIMIT) // 10
				.append(invoice.getAccountNum() != null ? invoice.getAccountNum() + DELIMIT : DELIMIT) // 11
				.append("10" + DELIMIT) // 12
				.append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT)
				.append(invoice.getIfsc() != null ? invoice.getIfsc() + DELIMIT : DELIMIT) // 19
				.append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT) // 20-25
				.append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT) // 26-31
				.append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT) // 32-37
				.append(DELIMIT).append(DELIMIT).append(DELIMIT).append(DELIMIT); // 38-41
		return builder.toString();
	}

}
