package com.revamp.core.dao;

import com.revamp.core.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

	/*@Query("from User where emailAddress = :emailAddress")
	public User findByEmail(@Param("emailAddress") String email);*/
	
	User findByEmailAddress(@Param("emailAddress") String emailAddress);

	List<User> findByStatus(String status);
	
	@Modifying
	@Query("UPDATE User u set u.status = :status, modifiedDate = now() where u.userid = :id")
    void updateUserStatus(@Param("id") long id, @Param("status") String status);

	@Modifying
	@Query("UPDATE User u set u.school_id = :school_id, modifiedDate = now() where u.userid = :id")
	void updateUserSchoolStatus(@Param("id") long id, @Param("school_id") long school_id);

	@Query("SELECT u FROM User u WHERE u.emailAddress = :emailAddress and u.password = :password")
    User findByEmailAddressPassword(@Param("emailAddress") String emailaddress, @Param("password") String password);

	@Query("SELECT u FROM User u where u.address.district = :district and u.role='Volunteer' and u.school_id=NULL and u.status='ApprovedUser'")
	List<User> findByDistrict(@Param("district") String district);

	@Query("SELECT u FROM User u where u.role='Volunteer' and u.school_id=NULL and u.status='ApprovedUser'")
	List<User> findAllVolunteers();
}
