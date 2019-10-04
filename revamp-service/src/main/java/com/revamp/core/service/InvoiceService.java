package com.revamp.core.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.revamp.core.model.FundAllotment;
import com.revamp.core.model.Invoice;
/**
 * 
 * @author Puthuyir Dev Team
 *
 */
public interface InvoiceService {
	
	public Invoice uploadInvoice(MultipartFile[] files,Invoice invoice);
	
	public Invoice getFile(long fileId);
	List<Invoice> getAllInvoice();
}
