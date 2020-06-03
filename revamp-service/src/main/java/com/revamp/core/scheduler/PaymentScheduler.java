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

	@Value("${payment.filePath}")
	private String filePath;

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
		File textOutputFile = new File(filePath);
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

	private String toPaymentString(Invoice invoice) {
		StringBuilder builder = new StringBuilder();
		builder.append(invoice.getPaymentMode() != null ? invoice.getPaymentMode() + DELIMIT : DELIMIT)
				.append(corporateCode).append(DELIMIT).append(invoice.getId()).append(DELIMIT)
				.append(corporateAccountNumber).append(DELIMIT).append(invoice.getCreatedDate()).append(DELIMIT)
				.append(transactionCurrency).append(DELIMIT)
				.append(invoice.getTotalAmount() != null ? invoice.getTotalAmount() + DELIMIT : DELIMIT)
				.append(invoice.getCompanyName() != null ? invoice.getCompanyName() + DELIMIT : DELIMIT)
				.append(invoice.getAccountNum() != null ? invoice.getAccountNum() + DELIMIT : DELIMIT)
				.append(invoice.getBankName() != null ? invoice.getBankName() + DELIMIT : DELIMIT)
				.append(invoice.getIfsc() != null ? invoice.getIfsc() + DELIMIT : DELIMIT);
		return builder.toString();
	}

}
