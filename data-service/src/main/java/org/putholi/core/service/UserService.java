package org.putholi.core.service;

import org.putholi.core.model.User;

import java.util.List;
import java.util.Map;

public interface UserService {

	long save(User user, List<Map<String, byte[]>>filesInBytes, String imgPath);

	User get(long id);
	
	User findByEmailAddress(String email);
	
	List<User> findAllUsers();
	
	void deleteUser(long id);
	
	List<User> findByStatus(String status);
	
	User updateUserStatus(long id, String status);

	User findByEmailAddressPassword(String emailAddress, String password);

    List<User> findByDistrict(String district);

	User updateUserSchoolStatus(long userId, long schoolId);

	List<User> findAllVolunteers();

	void removeSchoolId(Long oldVolunteerId);
}
