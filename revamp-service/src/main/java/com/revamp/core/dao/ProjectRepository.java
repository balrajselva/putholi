package com.revamp.core.dao;

import java.util.Collection;
import java.util.List;

import com.revamp.core.lookup.PuthuyirLookUp;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
	
	@Query("FROM Project p where p.school.schoolId = :schoolId")
	List<Project> findBySchoolId(@Param("schoolId") long schoolId);

	@Modifying
	@Query("UPDATE Project s set s.status = :status,s.estimate= :estimate,s.commentList= :commentList, modifiedDate = now() where s.projectId = :id")
	void updateProjectStatus(@Param("id") long id, @Param("status") PuthuyirLookUp status,@Param("estimate")Integer estimate,@Param("commentList") String commentList);

	@Modifying
	@Query("UPDATE Project s set s.status = :status,s.commentList= :commentList, modifiedDate = now() where s.projectId = :id")
	void updateStatus(@Param("id") long id, @Param("status") PuthuyirLookUp status,@Param("commentList") String commentList);

}
