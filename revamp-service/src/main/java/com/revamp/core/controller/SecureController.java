/*package com.revamp.core.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revamp.core.model.User;
import com.revamp.core.service.UserService;


*//**
 * 
 * @author PuthyirDevTeam
 *
 *//*
@RestController
@RequestMapping("/secure")
public class SecureController {
	private final static Logger logger = LoggerFactory.getLogger(SecureController.class);
	@Autowired
	private UserService userService;
	
    *//**
     * 
     * @return
     *//*
	@RequestMapping("/user/users")
	public String loginSuccess() {
		return "Login Successful!";
	}
  *//**
   * 
   * @param email
   * @return
   *//*
	@RequestMapping(value = "/user/email", method = RequestMethod.POST)
	public User findByEmail(@RequestBody String email) {
		return userService.findByEmail(email);
	}

	
}
*/