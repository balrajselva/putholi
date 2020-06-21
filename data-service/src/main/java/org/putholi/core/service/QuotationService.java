package org.putholi.core.service;

import org.putholi.core.model.Quotation;
import org.putholi.core.model.UpdateQuotation;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface QuotationService {

	long save(Quotation quotation);

	Quotation getQuotation(long id);

	List<Quotation> getQuotations();

	void deleteQuotation(long id);

	List<Quotation> findByQuotationStatus(String quotationStatus);
	
	List<Quotation> findBySchoolId(long schoolId);

	List<Quotation> findByRequirementId(long requirementId);

	List<Quotation> findBySchoolIdAndRequirementId(long schoolId, long requirementId);

    Boolean updateQuotation(UpdateQuotation updateQuotation);

	void updateSelectedQuotation(UpdateQuotation updateQuotation);

	List<Quotation> findBySchoolIdAndStatus(long schoolId);

    long save(Quotation quotation, Map<String,byte[]> filesInBytes, List<Map<String,byte[]>> preImageInBytes, String imgPath);

	void rejectQuotation(UpdateQuotation updateQuotation);
}
