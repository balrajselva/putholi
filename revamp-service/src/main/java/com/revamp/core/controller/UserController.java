package com.revamp.core.controller;

import com.revamp.core.model.School;
import com.revamp.core.model.User;
import com.revamp.core.response.UserResponse;
import com.revamp.core.service.SchoolService;
import com.revamp.core.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost")
@RestController
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private UserService userService;
	private UserResponse userResponse;

	@Autowired
	private SchoolService schoolService;

	//---Register user---
	/**
	 * 
	 * @param user
	 * @return
	 */
	@PostMapping("/user")
	public ResponseEntity<User> save(@RequestBody User user) {
		System.out.println("save method called --- "+user);
		long id = userService.save(user);
		user.setUserid(id);
		return ResponseEntity.ok().body(user);
	}

	//---Get a user by id---
	@GetMapping("/user/{id}")
	public ResponseEntity<User> get(@PathVariable("id") long userId) {
		System.out.println("get method");
		User user = userService.get(userId);
		return ResponseEntity.ok().body(user);
	}

	/**
	 * 
	 * @param login
	 * @return
	 * @throws ServletException
	 */
	@PostMapping("/login")
	public ResponseEntity<UserResponse> login(@RequestBody User login) throws ServletException {

		logger.info("Entering into Login Method");

		logger.info("Entering into Login Method ***" + login.toString());

		String jwtToken = "";

		if (login.getEmailAddress() == null) {
			throw new ServletException("Please fill in username and password");
		}

		String email = login.getEmailAddress();
		
		User user = userService.findByEmailAddress(email);
		if(user!= null) {
		jwtToken = Jwts.builder().setSubject(email).claim("roles", user.getRole()).setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
		}
		logger.info("JWT token in SpringBoot" + jwtToken);
		if (jwtToken != null && jwtToken.length() > 0) {
			userResponse = new UserResponse();
			userResponse.setEmail(user.getEmailAddress());
			userResponse.setFirstName(user.getFirstName());
			userResponse.setLastName(user.getLastName());
			userResponse.setToken(jwtToken);
			userResponse.setRole(user.getRole());
			return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);

		}else {
			userResponse = new UserResponse();
			
			jwtToken = Jwts.builder().setSubject(email).claim("roles", "NoRole").setIssuedAt(new Date())
					.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
			userResponse.setToken(jwtToken);
		
		return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);
		}
		
	}
		
	@GetMapping("/user")
	public List<User> findAllUsers() {
		System.out.println("Get all user");
		return userService.findAllUsers();
	}
		
	@DeleteMapping("/user/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") long id) {
		System.out.println("Delete user");
		userService.deleteUser(id);
		return new ResponseEntity<>("DELETE Response", HttpStatus.OK);
	}

	//---Register user---
	/**
	 * 
	 * @param user
	 * @return
	 */
	@PutMapping("/updateUser/{id}/{status}")
	public ResponseEntity<User> updateUser(@PathVariable long id, @PathVariable String status) {
		System.out.println("Update user"+id+""+status);
		User user = userService.updateUserStatus(id, status);
		return ResponseEntity.ok().body(user);
	}	
	
	@PostMapping("/verify_user")
	public ResponseEntity<User> loginUser(@RequestBody User login){
		System.out.println(login);
		User user=userService.findByEmailAddressPassword(login.getEmailAddress(),login.getPassword());
		System.out.println(user);
//		List<School> school=schoolService.getByUserId(user.getUserid());
//		System.out.println(school);
		return ResponseEntity.ok().body(user);
	}

}