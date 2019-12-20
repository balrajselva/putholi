package com.revamp.core.dao;

import com.revamp.core.model.Quotation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuotationRepository extends CrudRepository<Quotation, Long> {

	List<Quotation> findByQuotationStatus(@Param("quotationStatus") String quotationStatus);

	List<Quotation> findBySchoolId(@Param("schoolId") long schoolId);

}
