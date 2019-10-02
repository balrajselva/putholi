package com.revamp.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.revamp.core.model.User;

public interface UserRepository extends CrudRepository<User, Long> {

	/*@Query("from User where emailAddress = :emailAddress")
	public User findByEmail(@Param("emailAddress") String email);*/
	
	public User findByEmailAddress(@Param("emailAddress") String emailAddress);

	public List<User> findByStatus(String status);
	
	@Modifying
	@Query("UPDATE User u set u.status = :status, modifiedDate = now() where u.userid = :id")
	public void updateUserStatus(@Param("id") long id, @Param("status") String status);

	@Query("SELECT u FROM User u WHERE u.emailAddress = :emailAddress and u.password = :password")
	public User findByEmailAddressPassword(@Param("emailAddress")String emailaddress, @Param("password")String password);

}
