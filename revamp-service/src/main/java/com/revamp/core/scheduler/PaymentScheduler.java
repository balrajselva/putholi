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

import com.revamp.core.dao.InvoiceRepository;
import com.revamp.core.model.Invoice;

/*
 * Scheduler looks up invoice table and picks up record(s) that are in 'InvoiceApproved'
 * status and generates payment file.
 * 
 * 
 */

@Component
public class PaymentScheduler {

	private static final String DELIMITER = "^";

	private static final Logger logger = LoggerFactory.getLogger(PaymentScheduler.class);

	@Value("${payment.filePath}")
	private String filePath;

	@Autowired
	private InvoiceRepository invoiceRepository;

	@Scheduled(cron = "${cronExpression}")
	public void findApprovedInvoices() {
		logger.info("Start Invoice Scheduler :{}", ZonedDateTime.now());
		List<Invoice> invoices = invoiceRepository.findByInvoiceStatus("InvoiceApproved");
		if (invoices != null) {
			logger.info("Nnumber of invoices in Approved Status : {}", invoices.size());
			createPaymentFile(invoices);
		} else {
			logger.warn("There are no invoices in Approved Status");
		}
		logger.info("End Invoice Scheduler :{}", ZonedDateTime.now());
	}

	public void createPaymentFile(List<Invoice> invoices) {
		File textOutputFile = new File(filePath);
		try (PrintWriter pw = new PrintWriter(textOutputFile)) {
			for (Invoice invoice : invoices) {
				pw.println(toPaymentString(invoice));
			}
		} catch (FileNotFoundException e) {
			logger.error("Error creating payment file {}", e.toString());
		}
	}

	private String toPaymentString(Invoice invoice) {
		StringBuilder builder = new StringBuilder();
		builder.append(invoice.getId()).append(DELIMITER)
				.append(invoice.getCompanyName() != null ? invoice.getCompanyName() + DELIMITER : DELIMITER)
				.append(invoice.getTotalAmount() != null ? invoice.getTotalAmount() + DELIMITER : DELIMITER)
				.append(invoice.getBankName() != null ? invoice.getBankName() + DELIMITER : DELIMITER)
				.append(invoice.getIfsc() != null ? invoice.getIfsc() + DELIMITER : DELIMITER)
				.append(invoice.getAccountNum() != null ? invoice.getAccountNum() + DELIMITER : DELIMITER);
		return builder.toString();
	}

}
