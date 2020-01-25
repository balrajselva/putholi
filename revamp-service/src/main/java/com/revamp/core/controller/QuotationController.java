package com.revamp.core.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.revamp.core.model.Requirement;
import com.revamp.core.model.UpdateQuotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revamp.core.model.Quotation;
import com.revamp.core.service.QuotationService;

@RestController
public class QuotationController {

	@Autowired
	QuotationService quotationService;

	@GetMapping("/quotations")
	public List<Quotation> getQuotations() {
		return quotationService.getQuotations();
	}

	@GetMapping("/quotation/{id}")
	public Optional<Quotation> getQuotation(@PathVariable("id") long quotationId) {
		return quotationService.getQuotation(quotationId);
	}

	@PostMapping("/quotation")
	public ResponseEntity<Quotation> setQuotation(@RequestBody Quotation quotation) {
		long id = quotationService.save(quotation);
		quotation.setQuotationId(id);
		return ResponseEntity.ok().body(quotation);
	}

	@PostMapping("/updateQuotation")
	public ResponseEntity<Boolean> upsateQuotation(@RequestBody UpdateQuotation updateQuotation) {
		Boolean isUpdated=quotationService.updateQuotation(updateQuotation);
		return new ResponseEntity<>(isUpdated,HttpStatus.OK);
	}

	@DeleteMapping("/quotation/{id}")
	public ResponseEntity<String> deleteQuotation(@PathVariable("id") long quotationId) {
		quotationService.deleteQuotation(quotationId);
		return new ResponseEntity<>("DELETE Response", HttpStatus.OK);
	}

	@GetMapping("/quotation")
	public List<Quotation> findByQuotationStatus(@RequestParam("quotationStatus") String quotationStatus) {
		return quotationService.findByQuotationStatus(quotationStatus);
	}

	@PostMapping("/getQuotations/{id}")
	public Map<Long, List<Quotation>> findBySchoolIdAndReq(@PathVariable("id") String schoolId) {
		List<Quotation> quotations=quotationService.findBySchoolId(Long.valueOf(schoolId));
		Map<Long,List<Quotation>> quotationList=quotations.stream().collect(Collectors.groupingBy(Quotation::getRequirementId));
		return quotationList;
	}

	@GetMapping("/quotations/{schoolId}")
	public List<Quotation> findBySchoolId(@PathVariable("schoolId") long schoolId) {
		return quotationService.findBySchoolId(schoolId);
	}

	@GetMapping("/{requirementId}/quotations")
	public List<Quotation> findByRequirementId(@PathVariable("requirementId") long requirementId) {
		return quotationService.findByRequirementId(requirementId);
	}

	@GetMapping("/{schoolId}/{requirementId}/quotations")
	public List<Quotation> findBySchoolIdAndRequirementId(@PathVariable("schoolId") long schoolId,
			@PathVariable("requirementId") long requirementId) {
		return quotationService.findBySchoolIdAndRequirementId(schoolId, requirementId);
	}

}
