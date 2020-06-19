package org.putholi.core.dao;

import org.putholi.core.model.Requirement;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequirementRepository extends CrudRepository<Requirement, Long> {
	
	@Query("FROM Requirement R where R.project.projectId IN :projectIds")
	List<Requirement> findByProjectIds(@Param("projectIds") List<Long> projectIds);

	@Modifying
	@Query("UPDATE Requirement s set s.status = :status, modifiedDate = now() where s.project.projectId = :id")
    void updateRequirementStatus(@Param("id")long id,@Param("status") String status);

	@Modifying
	@Query("UPDATE Requirement s set s.estimate = :estimate, modifiedDate = now() where s.requirementId = :id")
	void updateRequirementEstimate(@Param("id")long id,@Param("estimate") Integer estimate);

	@Modifying
	@Query("UPDATE Requirement s set s.collectedAmount = :collectedAmount, modifiedDate = now() where s.requirementId = :id")
	void updateRequirementCollectedAmount(@Param("id")long id,@Param("collectedAmount") Integer collectedAmount);

	@Modifying
	@Query("UPDATE Requirement s set s.status = :status, modifiedDate = now() where s.requirementId = :id")
	void updateStatus(@Param("id")long id,@Param("status") String status);

	@Modifying
	@Query("UPDATE Requirement s set s.invoiceStatus = :status, modifiedDate = now() where s.requirementId = :id")
	void updateInvoiceStatus(@Param("id")long id,@Param("status") String status);
}
