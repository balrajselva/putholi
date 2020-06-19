package org.putholi.core.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.putholi.core.model.SchoolRegFormModel;
import org.putholi.core.model.User;
import org.putholi.core.response.UserResponse;
import org.putholi.core.service.SchoolService;
import org.putholi.core.service.UserService;
import org.putholi.core.web.util.WebUtilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

@CrossOrigin(origins = "http://localhost")
@RestController
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private UserService userService;
	private UserResponse userResponse;

	@Autowired
	private SchoolService schoolService;

	@Value("${image.path}")
	private String imgPath;

	@Value("${trust.member.fee}")
	private String regFee;
	//---Register user---
	/**
	 *
	 * @param user
	 * @return
	 */
	@PostMapping("/user")
	public ResponseEntity<User> multiUploadFileModel(@ModelAttribute("regFormModel") SchoolRegFormModel regFormModel,
													 HttpServletRequest request) {
		User user = new User();
		try {
			System.out.println("..regFormModel.getPayload().."+regFormModel );
			user = new ObjectMapper().readValue(regFormModel.getPayload(), User.class);
			if(regFormModel.getFiles() != null ) {
				List<Map<String, byte[]>> filesInBytes = new ArrayList<>();
				for(int i=0;i<regFormModel.getFiles().length;i++) {
					filesInBytes.add(WebUtilities
							.convertMultiPartToBytes(Arrays.asList(regFormModel.getFiles()[i])));
				}
				long id = userService.save(user, filesInBytes,imgPath);
			} else {
				long id = userService.save(user, null, imgPath);
			}
		} catch (IOException ex) {
			ex.printStackTrace();
			return ResponseEntity.badRequest().body(user);
		}
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
		return ResponseEntity.ok().body(user);
	}

	@GetMapping("/volunteer/{district}")
	public ResponseEntity<List<User>> findByDistrict(@PathVariable("district")  String district){
		System.out.println(district);
		List<User> userList=userService.findByDistrict(district);
		System.out.println(userList);
		return ResponseEntity.ok().body(userList);
	}

	@GetMapping("/volunteer/getAll")
	public ResponseEntity<List<User>> findAll(){
		List<User> userList=userService.findAllVolunteers();
		System.out.println(userList);
		return ResponseEntity.ok().body(userList);
	}

	@GetMapping("/trustMemberRegistration")
	public ResponseEntity<String> trustMemberRegistraton(){
		return ResponseEntity.ok().body(regFee);
	}
}