package com.revamp.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.revamp.core.model.VolunteerReference;

public interface VolunteerReferenceRepository extends CrudRepository<VolunteerReference, Long> {

	@Query("SELECT v FROM VolunteerReference v WHERE v.sponsorEmail=:sponsorEmail")
	List<VolunteerReference> findBySponsorEmail(@Param("sponsorEmail") String sponsorEmail);

}
