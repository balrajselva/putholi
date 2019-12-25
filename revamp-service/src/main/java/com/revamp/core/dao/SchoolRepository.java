package com.revamp.core.dao;

import com.revamp.core.model.School;
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

	@Modifying
	@Query("UPDATE School s set s.schoolStatus = :status, modifiedDate = now() where s.schoolId = :id")
	void updateSchoolStatus(@Param("id") long id, @Param("status") String status);
}
