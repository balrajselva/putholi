package org.putholi.core.controller;

import org.putholi.core.model.User;
import org.putholi.core.model.VolunteerReference;
import org.putholi.core.service.UserService;
import org.putholi.core.service.VolunteerReferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost")
@RestController
public class AdminController {
	
	@Autowired
    UserService userService;
	
	@Autowired
    VolunteerReferenceService volunteerReferenceService;
	
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
