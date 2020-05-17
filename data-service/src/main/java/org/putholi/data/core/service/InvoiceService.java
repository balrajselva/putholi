package org.putholi.data.core.service;

import org.putholi.data.core.model.FundAllotment;
import org.putholi.data.core.model.Invoice;

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

	List<Invoice> getInvoiceBySchoolId(long schoolId);

    void updateInvoiceAndFund(FundAllotment fundMasterList, Invoice invoiceList);

    void updateStatus(Long invoiceId, Long userId,String status);
}
