package org.putholi.data.core.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.putholi.data.core.lookup.PuthuyirLookUp;
import org.putholi.data.core.model.Quotation;
import org.putholi.data.core.model.UpdateQuotation;

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

	Boolean updateSelectedQuotation(long schoolId, PuthuyirLookUp updateQuotation);

	List<Quotation> findBySchoolIdAndStatus(long schoolId);

    long save(Quotation quotation, Map<String,byte[]> filesInBytes, String imgPath);
}
