package com.revamp.batch.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revamp.batch.model.School;

/**
 * 
 * Puthyir DevTeam
 *
 */
@Repository
public interface BatchRepository extends CrudRepository<School, Long> {

	@Query("FROM School where status = :status")
	public List<School> status(@Param("status") String status);

	@Modifying
	@Query("UPDATE School SET status =:status WHERE school_id = :schoolid")
	public int updateStatus(@Param("schoolid") long school_id, @Param("status") String status);

	@Modifying
	@Query("UPDATE FundAllotment SET status =:status WHERE requirement_id = :requirement_id")
	public int updateFundStatus(@Param("requirement_id") long requirement_id, @Param("status") String status);

	@Modifying
	@Query("UPDATE School SET Requirement_Fund =:Requirement_Fund WHERE school_id = :schoolid")
	public int updateRequirementStatus(@Param("schoolid") long school_id, @Param("Requirement_Fund") String Requirement_Fund);

	
}
