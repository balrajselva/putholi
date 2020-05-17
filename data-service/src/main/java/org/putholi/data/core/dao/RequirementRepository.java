package org.putholi.data.core.dao;

import java.util.List;

import org.putholi.data.core.lookup.PuthuyirLookUp;
import org.putholi.data.core.model.Requirement;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequirementRepository extends CrudRepository<Requirement, Long> {
	
	@Query("FROM Requirement R where R.project.projectId IN :projectIds")
	List<Requirement> findByProjectIds(List<Long> projectIds);

	@Modifying
	@Query("UPDATE Requirement s set s.status = :status, modifiedDate = now() where s.requirementId = :id")
    void updateRequirementStatus(long id, PuthuyirLookUp status);

	@Modifying
	@Query("UPDATE Requirement s set s.estimate = :estimate, modifiedDate = now() where s.requirementId = :id")
	void updateRequirementEstimate(long id, Integer estimate);

	@Modifying
	@Query("UPDATE Requirement s set s.collectedAmount = :collectedAmount, modifiedDate = now() where s.requirementId = :id")
	void updateRequirementCollectedAmount(long id, Integer collectedAmount);
}
