package com.revamp.core.controller;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.model.*;
import com.revamp.core.web.util.WebUtilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revamp.core.service.QuotationService;

import javax.servlet.http.HttpServletRequest;

@RestController
public class QuotationController {

	private static final Logger logger = LoggerFactory.getLogger(SchoolController.class);

	@Autowired
	QuotationService quotationService;

	@Value("${image.path}")
	private String imgPath;

	@GetMapping("/quotations")
	public List<Quotation> getQuotations() {
		return quotationService.getQuotations();
	}

	@GetMapping("/quotation/{id}")
	public Optional<Quotation> getQuotation(@PathVariable("id") long quotationId) {
		return quotationService.getQuotation(quotationId);
	}

	@PostMapping("/quotation")
	public ResponseEntity<?> setQuotation(@ModelAttribute("regFormModel") SchoolRegFormModel regFormModel,
												  HttpServletRequest request) {

		try {
			System.out.println("..regFormModel.getPayload().."+regFormModel );
			Quotation quotation = new ObjectMapper().readValue(regFormModel.getPayload(), Quotation.class);
			System.out.println(quotation);
			if(regFormModel.getFiles() != null && regFormModel.getFiles().length > 0) {
				Map<String, byte[]> filesInBytes = WebUtilities
						.convertMultiPartToBytes(Arrays.asList(regFormModel.getFiles()));
				long id = quotationService.save(quotation, filesInBytes,imgPath);
			} else {
				long id = quotationService.save(quotation, null, imgPath);
			}
		} catch (IOException ex) {
			logger.debug("Error on multiUploadFileModel {}", ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Successfully uploaded!", HttpStatus.OK);

	}

	@PostMapping("/updateQuotation")
	public ResponseEntity<Boolean> updateQuotation(@RequestBody UpdateQuotation updateQuotation) {
		Boolean isUpdated=quotationService.updateQuotation(updateQuotation);
		return new ResponseEntity<>(isUpdated,HttpStatus.OK);
	}

	@PostMapping("/updateSelectedQuotation/{id}/{status}")
	public ResponseEntity<Boolean> updateSelectedQuotation(@PathVariable("id") long schoolId,@PathVariable("status") String status) {
		PuthuyirLookUp status1=null;
		if(status.equals("ReviewerConfirmed")){
			status1= PuthuyirLookUp.REVIEWER_APPROVED_QUOTATION;
		}
		else if(status.equals("ApproverConfirmed")){
			status1= PuthuyirLookUp.APPROVER_APPROVED_QUOTATION;
		}
		else if(status.equals("ReviewerRejected")){
			status1= PuthuyirLookUp.REVIEWER_REJECTED_QUOTATION;
		}
		else if(status.equals("ApproverRejected")){
			status1= PuthuyirLookUp.APPROVER_REJECTED_QUOTATION;
		}
		Boolean isUpdated=quotationService.updateSelectedQuotation(schoolId,status1);
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

	@GetMapping("/{school_id}/selectedQuotations")
	public List<Quotation> findBySchoolIdAndSelectedQuotation(@PathVariable("school_id") long schoolId){
		List<Quotation> quotations = quotationService.findBySchoolIdAndStatus(schoolId);
		System.out.println(schoolId);
		System.out.println(quotations);
		return quotations;
	}

}
