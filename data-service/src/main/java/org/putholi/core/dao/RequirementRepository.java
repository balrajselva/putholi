package org.putholi.core.dao;

import org.putholi.core.model.Requirement;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequirementRepository extends CrudRepository<Requirement, Long> {
	
	@Query("FROM Requirement R where R.project.projectId IN :projectIds")
	List<Requirement> findByProjectIds(List<Long> projectIds);

	@Modifying
	@Query("UPDATE Requirement s set s.status = :status, modifiedDate = now() where s.requirementId = :id")
    void updateRequirementStatus(long id, String status);

	@Modifying
	@Query("UPDATE Requirement s set s.estimate = :estimate, modifiedDate = now() where s.requirementId = :id")
	void updateRequirementEstimate(long id, Integer estimate);

	@Modifying
	@Query("UPDATE Requirement s set s.collectedAmount = :collectedAmount, modifiedDate = now() where s.requirementId = :id")
	void updateRequirementCollectedAmount(long id, Integer collectedAmount);

	@Modifying
	@Query("UPDATE Requirement s set s.status = :status, modifiedDate = now() where s.requirementId = :id")
	void updateStatus(long id, String status);
}
