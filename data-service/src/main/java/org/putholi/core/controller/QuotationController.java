package org.putholi.core.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.putholi.core.model.Quotation;
import org.putholi.core.model.SchoolRegFormModel;
import org.putholi.core.model.UpdateQuotation;
import org.putholi.core.service.QuotationService;
import org.putholi.core.service.RequirementService;
import org.putholi.core.web.util.WebUtilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class QuotationController {

	private static final Logger logger = LoggerFactory.getLogger(SchoolController.class);

	@Autowired
	QuotationService quotationService;

	@Autowired
	RequirementService requirementService;

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
			long id;
			System.out.println("..regFormModel.getPayload().."+regFormModel );
			Quotation quotation = new ObjectMapper().readValue(regFormModel.getPayload(), Quotation.class);
			System.out.println(quotation);
			if(regFormModel.getFiles() != null) {
				Map<String, byte[]> filesInBytes = WebUtilities
						.convertMultiPartToBytes(Arrays.asList(regFormModel.getFiles()));
				Map<String, byte[]> preImageInBytes = null;
//				if(regFormModel.getPreImage() != null) {
//					 preImageInBytes = WebUtilities
//							.convertMultiPartToBytes(regFormModel.getPreImage());
//				}
				id = quotationService.save(quotation, filesInBytes, preImageInBytes, imgPath);
			} else {
				id = quotationService.save(quotation, null, null, imgPath);
			}
			return new ResponseEntity<>(id, HttpStatus.OK);
		} catch (IOException ex) {
			logger.debug("Error on multiUploadFileModel {}", ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/updateQuotation")
	public ResponseEntity<Boolean> updateQuotation(@RequestBody UpdateQuotation updateQuotation) {
		Boolean isUpdated=quotationService.updateQuotation(updateQuotation);
		return new ResponseEntity<>(isUpdated,HttpStatus.OK);
	}

	@PostMapping("/rejectQuotations")
	public ResponseEntity<Boolean> rejectQuotations(@RequestBody UpdateQuotation updateQuotation) {
		quotationService.rejectQuotation(updateQuotation);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/updateSelectedQuotation")
	public ResponseEntity<Boolean> updateSelectedQuotation(@RequestBody UpdateQuotation updateQuotation) {
		quotationService.updateSelectedQuotation(updateQuotation);
		return new ResponseEntity<>(HttpStatus.OK);
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
		List<Quotation> quotationList = quotationService.findBySchoolIdAndStatus(schoolId);
		System.out.println(schoolId);
		for (Quotation quotation:quotationList) {
			quotation.setRequirement(requirementService.findById(quotation.getRequirementId()));
		}
		return quotationList;
	}

}
