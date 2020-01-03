package com.revamp.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.Requirement;

@Repository
public interface RequirementRepository extends CrudRepository<Requirement, Long> {
	
	@Query("FROM Requirement R where R.project.projectId IN :projectIds")
	List<Requirement> findByProjectIds(List<Long> projectIds);

}
