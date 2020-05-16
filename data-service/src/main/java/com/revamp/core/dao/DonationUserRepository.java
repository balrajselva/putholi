package com.revamp.core.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.DonationUser;

@Repository
public interface DonationUserRepository extends CrudRepository<DonationUser,Long>  {
	
	public DonationUser findByEmailAddress(@Param("emailAddress") String emailAddress);

	@Query("SELECT u FROM DonationUser u WHERE u.emailAddress = :emailAddress and u.password = :password")
	public DonationUser findByEmailAddressPassword(@Param("emailAddress")String emailaddress, @Param("password")String password);

}
