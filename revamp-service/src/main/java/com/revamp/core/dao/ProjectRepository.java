package com.revamp.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
	
	@Query("FROM Project p where p.school.schoolId = :schoolId")
	List<Project> findBySchoolId(@Param("schoolId") long schoolId);

}
