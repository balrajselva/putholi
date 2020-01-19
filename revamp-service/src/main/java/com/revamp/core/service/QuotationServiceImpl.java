package com.revamp.core.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.QuotationRepository;
import com.revamp.core.model.Quotation;

@Service
@Transactional
public class QuotationServiceImpl implements QuotationService {

	@Autowired
	private QuotationRepository quotationRepository;

	QuotationServiceImpl(QuotationRepository quotationRepository) {
		this.quotationRepository = quotationRepository;
	}

	@Override
	public Optional<Quotation> getQuotation(long id) {
		return quotationRepository.findById(id);
	}

	@Override
	public List<Quotation> getQuotations() {
		return (List<Quotation>) quotationRepository.findAll();
	}

	@Override
	public long save(Quotation quotation) {
		return quotationRepository.save(quotation).getQuotationId();
	}

	@Override
	public void deleteQuotation(long id) {
		quotationRepository.deleteById(id);
	}

	@Override
	public List<Quotation> findByQuotationStatus(String quotationStatus) {
		return quotationRepository.findByQuotationStatus(quotationStatus);
	}

	@Override
	public List<Quotation> findBySchoolId(long schoolId) {
		return quotationRepository.findBySchoolId(schoolId);
	}

	@Override
	public List<Quotation> findByRequirementId(long requirementId) {
		return quotationRepository.findByRequirementId(requirementId);
	}

	@Override
	public List<Quotation> findBySchoolIdAndRequirementId(long schoolId, long requirementId) {
		return quotationRepository.findBySchoolIdAndRequirementId(schoolId, requirementId);
	}

}
