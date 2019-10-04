package com.revamp.core.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.Quotation;

@Repository
public interface QuotationRepository extends CrudRepository<Quotation, Long> {

	public List<Quotation> findByQuotationStatus(@Param("quotationStatus") String quotationStatus);

	public List<Quotation> findBySchoolId(@Param("schoolId") long schoolId);

}
