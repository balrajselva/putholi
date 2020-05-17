package org.putholi.data.core.dao;

import java.util.List;

import org.putholi.data.core.model.VolunteerReference;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface VolunteerReferenceRepository extends CrudRepository<VolunteerReference, Long> {

	@Query("SELECT v FROM VolunteerReference v WHERE v.sponsorEmail=:sponsorEmail")
	List<VolunteerReference> findBySponsorEmail(@Param("sponsorEmail") String sponsorEmail);

}
