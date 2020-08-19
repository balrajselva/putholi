package org.putholi.core.scheduler;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import org.putholi.core.service.InvoiceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Scheduler picks up incoming payment file and reads line by line and updates
 * invoice records to PAYMENT_COMPLETED/FAILED based on status code
 */
@Component
public class IncomingPaymentScheduler {

	private static final String DELIMIT = "\\^";

	private static final Logger log = LoggerFactory.getLogger(IncomingPaymentScheduler.class);

	@Value("${incoming.payment.fileName}")
	private String fileName;

	@Autowired
	private InvoiceService invoiceService;

	@Scheduled(cron = "${incomingCronExpression}")
	public void processIncomingPaymentFile() {
		log.info("Start processing incoming file");
		Path path = Paths.get(fileName);
		try (Stream<String> contents = Files.lines(path)) {
			contents.forEach(line -> {
				String[] strArray = line.split(DELIMIT);
				if (strArray != null && strArray.length > 0) {
					log.info("line {}", line);
					updateInvoiceRecords(strArray[0], strArray[6]);
				} else {
					log.error("Payment record is not good enough to process {}", line);
				}
			});
		} catch (IOException e) {
			log.error("Error reading incoming payment file", e);
		}
		log.info("End processing incoming file");
	}

	private void updateInvoiceRecords(String invoiceId, String statusCode) {
		try {
			if ("0".equals(statusCode))
				invoiceService.updateStatus(Long.valueOf(invoiceId), 1l, "PAYMENT_COMPLETED");
			else
				invoiceService.updateStatus(Long.valueOf(invoiceId), 1l, "PAYMENT_FAILED");
		} catch (Exception e) {
			log.error("Error updating invoice record in payment scheduler");
		}
	}

}
