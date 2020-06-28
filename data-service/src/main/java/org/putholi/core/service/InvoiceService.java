package org.putholi.core.service;

import org.putholi.core.model.FundAllotment;
import org.putholi.core.model.Invoice;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author Puthuyir Dev Team
 *
 */
public interface InvoiceService {

	long save(Invoice invoice, Map<String,byte[]> filesInBytes, List<Map<String,byte[]>> postImageInBytes, String imgPath);
	
	Invoice getFile(long fileId);

	List<Invoice> getAllInvoice();

	long save(Invoice invoice);

	void deleteQuotation(long invoiceId);

	List<Invoice> getInvoiceBySchoolId(long schoolId);

    List<Invoice> getInvoiceByRequirementId(long requirementId);

    void updateInvoiceAndFund(FundAllotment fundMasterList, Invoice invoiceList);

    void updateStatus(Long invoiceId, Long userId,String status);

    void updateAdminComments(long invoiceId, String adminComments);

    void updateApproverComments(long invoiceId, String approverComments);

    void updateReviewerComments(long invoiceId, String reviewerComments);
    
    List<Invoice> findByInvoiceStatus(String invoiceStatus);

    long saveReceipt(Invoice invoice, Map<String,byte[]> filesInBytes);

    List<Invoice> getPaidInvoiceBySchoolId(long schoolId);
}
