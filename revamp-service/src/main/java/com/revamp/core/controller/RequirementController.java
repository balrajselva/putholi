package com.revamp.core.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revamp.core.model.Quotation;
import com.revamp.core.model.School;
import com.revamp.core.model.SchoolRegFormModel;
import com.revamp.core.web.util.WebUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revamp.core.model.Requirement;
import com.revamp.core.service.RequirementService;

import javax.servlet.http.HttpServletRequest;

@RestController
public class RequirementController {

	@Value("${image.path}")
	private String imgPath;

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

//	@PostMapping("/requirement")
//	public ResponseEntity<?> setQuotation(@ModelAttribute("regFormModel") SchoolRegFormModel regFormModel,
//										  HttpServletRequest request) {
//		try {
//			long id = 0;
//			System.out.println("..regFormModel.getPayload().."+regFormModel );
//			if(regFormModel.getFiles() != null && regFormModel.getFiles().length > 0) {
//				Requirement requirement = new ObjectMapper().readValue(regFormModel.getPayload(), Requirement.class);
//				Map<String, byte[]> preImageInBytes = null;
//				if(regFormModel.getPreImage() != null) {
//					preImageInBytes = WebUtilities
//							.convertMultiPartToBytes(Arrays.asList(regFormModel.getPreImage()));
//				}
//				id = requirementService.savePreImage(requirement,preImageInBytes, imgPath);
//			}
//			return new ResponseEntity<>(id, HttpStatus.OK);
//		} catch (IOException ex) {
//			return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
	
}
