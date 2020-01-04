package com.revamp.core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
}
