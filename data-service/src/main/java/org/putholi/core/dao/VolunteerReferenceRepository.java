package org.putholi.core.dao;

import org.putholi.core.model.VolunteerReference;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VolunteerReferenceRepository extends CrudRepository<VolunteerReference, Long> {

	@Query("SELECT v FROM VolunteerReference v WHERE v.sponsorEmail=:sponsorEmail")
	List<VolunteerReference> findBySponsorEmail(@Param("sponsorEmail") String sponsorEmail);

}
