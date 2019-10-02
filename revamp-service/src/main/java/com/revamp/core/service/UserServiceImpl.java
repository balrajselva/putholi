package com.revamp.core.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.UserRepository;
import com.revamp.core.model.User;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public long save(User school) {
		return userRepository.save(school).getUserid();
	}

	@Transactional
	@Modifying
	public User updateUserStatus(long id, String status) {
		userRepository.updateUserStatus(id, status);
		return userRepository.findById(id).orElse(null);
	}

	public User get(long id) {
		return userRepository.findById(id).orElse(null);
	}

	public User findByEmailAddress(String email) {
		return userRepository.findByEmailAddress(email);
	}

	public List<User> findAllUsers() {
		return (List<User>) userRepository.findAll();
	}

	@Override
	public void deleteUser(long id) {
		User user = userRepository.findById(id).orElse(null);
		if (user != null)
			userRepository.delete(user);
	}

	@Override
	public List<User> findByStatus(String status) {
		return userRepository.findByStatus(status);
	}

	@Override
	public User findByEmailAddressPassword(String emailAddress, String password) {
		return userRepository.findByEmailAddressPassword(emailAddress,password);
	}

}
