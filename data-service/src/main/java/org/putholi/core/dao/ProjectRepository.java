package org.putholi.core.dao;

import org.putholi.core.lookup.PuthuyirLookUp;
import org.putholi.core.model.Project;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
	
	@Query("FROM Project p where p.school.schoolId = :schoolId")
	List<Project> findBySchoolId(@Param("schoolId") long schoolId);

	@Modifying
	@Query("UPDATE Project s set s.status = :status,s.estimate= :estimate,s.adminComments= :adminComments, modifiedDate = now() where s.projectId = :id")
	void updateProject(@Param("id") long id, @Param("status") PuthuyirLookUp status,@Param("estimate")Integer estimate,@Param("adminComments") String adminComments);

	@Modifying
	@Query("UPDATE Project s set s.status = :status, s.adminComments= :adminComments, modifiedDate = now() where s.projectId = :id")
	void updateProjectStatus(@Param("id") long id, @Param("status") PuthuyirLookUp status,@Param("adminComments") String adminComments);

	@Modifying
	@Query("UPDATE Project s set s.status = :status,s.approverComments= :approverComments, modifiedDate = now() where s.projectId = :id")
	void updateApproverStatus(@Param("id") long id, @Param("status") PuthuyirLookUp status,@Param("approverComments") String approverComments);

	@Modifying
	@Query("UPDATE Project s set s.status = :status,s.reviewerComments= :reviewerComments, modifiedDate = now() where s.projectId = :id")
	void updateReviewerStatus(@Param("id") long id, @Param("status") PuthuyirLookUp status,@Param("reviewerComments") String reviewerComments);

	@Modifying
	@Query("UPDATE Project s set s.volunteerId = :volunteerId, modifiedDate = now() where s.school.schoolId = :id")
	void updateVolunteerId(@Param("id")long id,@Param("volunteerId") long volunteerId);

	@Modifying
	@Query("UPDATE Project s set s.receiptComments = :comment, modifiedDate = now() where s.projectId = :id")
	void updateReceiptComments(@Param("id") long id, @Param("comment") String comment);
}