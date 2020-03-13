package com.revamp.core.service;

import com.revamp.core.model.Invoice;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
/**
 * 
 * @author Puthuyir Dev Team
 *
 */
public interface InvoiceService {
	
	Invoice uploadInvoice(MultipartFile[] files, Invoice invoice);
	
	Invoice getFile(long fileId);

	List<Invoice> getAllInvoice();

	long save(Invoice invoice);

	void deleteQuotation(long invoiceId);
}
