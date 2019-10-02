package com.revamp.core.controller;

import java.util.List;
import java.util.Optional;

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

	@DeleteMapping("/quotation/{id}")
	public ResponseEntity<String> deleteQuotation(@PathVariable("id") long quotationId) {
		quotationService.deleteQuotation(quotationId);
		return new ResponseEntity<>("DELETE Response", HttpStatus.OK);
	}

	@GetMapping("/quotation")
	public List<Quotation> findByQuotationStatus(@RequestParam("quotationStatus") String quotationStatus) {
		return quotationService.findByQuotationStatus(quotationStatus);
	}

	@GetMapping("/{schoolId}/quotations")
	public List<Quotation> findBySchoolId(@PathVariable("schoolId") long schoolId) {
		return quotationService.findBySchoolId(schoolId);
	}

}
