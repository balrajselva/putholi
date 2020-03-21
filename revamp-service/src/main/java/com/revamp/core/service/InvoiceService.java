package com.revamp.core.service;

import com.revamp.core.model.Invoice;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author Puthuyir Dev Team
 *
 */
public interface InvoiceService {

	long save(Invoice invoice, Map<String,byte[]> filesInBytes, String imgPath);
	
	Invoice getFile(long fileId);

	List<Invoice> getAllInvoice();

	long save(Invoice invoice);

	void deleteQuotation(long invoiceId);
}
