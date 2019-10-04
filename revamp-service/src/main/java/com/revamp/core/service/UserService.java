package com.revamp.core.service;

import java.util.List;

import com.revamp.core.model.User;

public interface UserService {

	long save(User user);

	User get(long id);
	
	User findByEmailAddress(String email);
	
	List<User> findAllUsers();
	
	void deleteUser(long id);
	
	List<User> findByStatus(String status);
	
	User updateUserStatus(long id, String status);

	User findByEmailAddressPassword(String emailAddress, String password);

}
