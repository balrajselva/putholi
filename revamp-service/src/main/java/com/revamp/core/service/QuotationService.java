package com.revamp.core.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.model.Quotation;
import com.revamp.core.model.UpdateQuotation;

public interface QuotationService {

	long save(Quotation quotation);

	Optional<Quotation> getQuotation(long id);

	List<Quotation> getQuotations();

	void deleteQuotation(long id);

	List<Quotation> findByQuotationStatus(String quotationStatus);
	
	List<Quotation> findBySchoolId(long schoolId);

	List<Quotation> findByRequirementId(long requirementId);

	List<Quotation> findBySchoolIdAndRequirementId(long schoolId, long requirementId);

    Boolean updateQuotation(UpdateQuotation updateQuotation);

	void updateSelectedQuotation(UpdateQuotation updateQuotation);

	List<Quotation> findBySchoolIdAndStatus(long schoolId);

    long save(Quotation quotation, Map<String,byte[]> filesInBytes, Map<String,byte[]> preImageInBytes, String imgPath);

	void rejectQuotation(UpdateQuotation updateQuotation);
}
