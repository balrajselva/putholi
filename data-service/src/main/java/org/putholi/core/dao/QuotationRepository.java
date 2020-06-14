package org.putholi.core.dao;

import org.putholi.core.model.Quotation;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuotationRepository extends CrudRepository<Quotation, Long> {

	List<Quotation> findByQuotationStatus(@Param("quotationStatus") String quotationStatus);

	List<Quotation> findBySchoolId(@Param("schoolId") long schoolId);

	List<Quotation> findByRequirementId(@Param("requirementId") long requirementId);

	List<Quotation> findBySchoolIdAndRequirementId(long schoolId, long requirementId);

	Quotation findByQuotationId(@Param("quotationId") long quotationId);

	@Modifying
	@Query("UPDATE Quotation s set s.quotationStatus = :quotationStatus, modifiedDate = now() where s.quotationId = :quotationId")
	Integer updateQuotationStatus(@Param("quotationId")Long id,@Param("quotationStatus")String status);

	@Query("FROM Quotation s where s.schoolId = :schoolId and s.quotationStatus = 'QUOTATION_ACCEPTED'")
	List<Quotation> findBySchoolIdAndStatus(long schoolId);
}
