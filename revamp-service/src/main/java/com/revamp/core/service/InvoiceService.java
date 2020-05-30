package com.revamp.core.service;

import com.revamp.core.model.FundAllotment;
import com.revamp.core.model.Invoice;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author Puthuyir Dev Team
 *
 */
public interface InvoiceService {

	long save(Invoice invoice, Map<String,byte[]> filesInBytes,Map<String,byte[]> postImageInBytes,String imgPath);
	
	Invoice getFile(long fileId);

	List<Invoice> getAllInvoice();

	long save(Invoice invoice);

	void deleteQuotation(long invoiceId);

	List<Invoice> getInvoiceBySchoolId(long schoolId);

    void updateInvoiceAndFund(FundAllotment fundMasterList, Invoice invoiceList);

    void updateStatus(Long invoiceId, Long userId,String status);

    void updateAdminComments(long invoiceId, String adminComments);

    void updateApproverComments(long invoiceId, String approverComments);

    void updateReviewerComments(long invoiceId, String reviewerComments);

}
