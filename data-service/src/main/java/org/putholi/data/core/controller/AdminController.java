package org.putholi.data.core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.putholi.data.core.model.User;
import org.putholi.data.core.model.VolunteerReference;
import org.putholi.data.core.service.UserService;
import org.putholi.data.core.service.VolunteerReferenceService;

@CrossOrigin(origins = "http://localhost")
@RestController
public class AdminController {
	
	@Autowired UserService userService;
	
	@Autowired VolunteerReferenceService volunteerReferenceService;
	
	@GetMapping("/admin/users/{status}")
	public List<User> findByStatus(@PathVariable("status") String status) {
		return userService.findByStatus(status);
	}	

	@PostMapping("/admin/volunteerReferals")
	public ResponseEntity<VolunteerReference> saveVolunteerReferals(@RequestBody VolunteerReference vReference) {
		System.out.println("save vol--"+vReference);
		long Id=volunteerReferenceService.save(vReference);
		vReference.setVolunterReferenceId(Id);
		return ResponseEntity.ok().body(vReference);
	}
	
	@GetMapping("/admin/verifyReferals/{sponsorEmail}/{volunteerEmail}")
	public boolean verifyVolunteerReferals(@PathVariable("sponsorEmail") String sponsorEmail,@PathVariable("volunteerEmail") String volunteerEmail){
		boolean ispresent=volunteerReferenceService.verifyReferals(sponsorEmail,volunteerEmail);
		return ispresent;
	}
}
