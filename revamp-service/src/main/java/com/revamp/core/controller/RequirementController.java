package com.revamp.core.controller;

import java.util.List;

import com.revamp.core.model.School;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revamp.core.model.Requirement;
import com.revamp.core.service.RequirementService;

@RestController
public class RequirementController {
	
	@Autowired
	private RequirementService requirementService;

	@GetMapping("/{schoolId}/requirements")
	public List<Requirement> findBySchoolId(@PathVariable("schoolId") long schoolId) {
		return requirementService.findBySchoolId(schoolId);
	}

	@PutMapping("/updateRequirement/{id}/{status}")
	public ResponseEntity<Requirement> updateStatus(@PathVariable long id, @PathVariable String status) {
		System.out.println("Update requirement"+id+""+status);
		Requirement requirement = requirementService.updateStatus(id, status);
		return ResponseEntity.ok().body(requirement);
	}

	
}
