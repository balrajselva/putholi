package com.revamp.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.revamp.core.model.VolunteerReference;

public interface VolunteerReferenceRepository extends CrudRepository<VolunteerReference, Long> {

	@Query(value="SELECT * FROM volunteer_reference WHERE sponsor_email=?1",nativeQuery = true)
	List<VolunteerReference> findBySponsorEmail(String sponsorEmail);

}
