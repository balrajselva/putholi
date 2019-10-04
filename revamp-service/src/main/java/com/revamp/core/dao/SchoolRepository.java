package com.revamp.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.revamp.core.model.School;

public interface SchoolRepository extends CrudRepository<School, Long> {

	public List<School> findByAddressCity(@Param("city") String city);

	public List<School> findByAddressDistrict(@Param("district") String district);

	public List<School> findByAddressLocality(@Param("locality") String locality);

	@Query("FROM School s where s.user.userid = :userId")
	public List<School> getByUserId(@Param("userId") long userId);

	@Query("FROM School s where s.user.userid = :userId")
	public List<School> getByStatus(@Param("userId") long userId);
}
