package org.putholi.core.dao;

import org.putholi.core.model.School;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SchoolRepository extends CrudRepository<School, Long> {

	List<School> findByAddressCity(@Param("city") String city);

	List<School> findByAddressDistrict(@Param("district") String district);

	List<School> findByAddressLocality(@Param("locality") String locality);

	@Query("FROM School s where s.user.userid = :userId")
    List<School> getByUserId(@Param("userId") long userId);

	@Query("FROM School s where s.user.userid = :userId")
    List<School> getByStatus(@Param("userId") long userId);

	School findBySchoolId(@Param("schoolId") long schoolId);

	@Modifying
	@Query("UPDATE School s set s.schoolStatus = :status, modifiedDate = now() where s.schoolId = :id")
	void updateSchoolStatus(@Param("id") long id, @Param("status") String status);

	@Modifying
	@Query("UPDATE School s set s.schoolStatus = :status, s.volunteerId = :volunteerId, modifiedDate = now() where s.schoolId = :id")
	void updateSchoolStatusAndVolunteerId(@Param("id") long id, @Param("status") String status,@Param("volunteerId") Long volunteerId);

	@Modifying
	@Query("UPDATE School s set s.volunteerId = :volunteerId, modifiedDate = now() where s.schoolId = :id")
	void updateVolunteerId(@Param("id") long id,@Param("volunteerId") Long volunteerId);

	@Modifying
	@Query("UPDATE School s set s.enableDonation = :donationFlag, modifiedDate = now() where s.schoolId = :id")
	void updateDonationFlag(@Param("id") long id, @Param("donationFlag") String donationFlag);

}
