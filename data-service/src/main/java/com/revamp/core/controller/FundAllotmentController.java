package com.revamp.core.controller;

import java.util.List;
import java.util.Optional;

import com.revamp.core.model.FundAllotment;
import com.revamp.core.service.FundAllotmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revamp.core.model.FundDisbursement;

/**
 * 
 * @author Puthyir Dev Team
 *
 */
@RestController
public class FundAllotmentController {

	@Autowired
	FundAllotmentService fundAllotService;

	@Autowired
    FundAllotmentService fundAllotmentService;
//    /**fundAllotment
//     *
//     * @return List
//     */
//	@GetMapping("/fundallocations")
//	public List<FundDisbursement> getFundAllocations() {
//		return fundAllotService.getFundAllocations();
//	}
//    /**
//     *
//     * @param fundAllocationId
//     * @return
//     */
//	@GetMapping("/fundallocation/{id}")
//	public Optional<FundDisbursement> getFundAllocation(@PathVariable("id") long fundAllocationId) {
//		return fundAllotService.getFundAllocations(fundAllocationId);
//	}
//    /**
//     * Save Fund
//     * @param fundAllocation
//     * @return
//     */
//	@PostMapping("/fundallocation")
//	public ResponseEntity<FundDisbursement> saveFundAllocation(@RequestBody FundDisbursement fundAllocation) {
//		long id = fundAllotService.save(fundAllocation);
//		fundAllocation.setFundallotmentId(id);
//		return ResponseEntity.ok().body(fundAllocation);
//	}
//    /**
//     * Delete
//     * @param fundAllocationId
//     * @return
//     */
//	@DeleteMapping("/fundallocation/{id}")
//	public ResponseEntity<String> deleteFundAllocation(@PathVariable("id") long fundAllocationId) {
//		fundAllotService.deleteFundAllocation(fundAllocationId);
//		return new ResponseEntity<String>("DELETE Response", HttpStatus.OK);
//	}

	@PostMapping("/fundAllotment")
	public ResponseEntity<String> saveFundAllotment(@RequestBody List<FundAllotment> fundAllotmentList) {
		System.out.println(fundAllotmentList);
		fundAllotmentService.saveFund(fundAllotmentList);
		return new ResponseEntity<String>("Save Response", HttpStatus.OK);
	}

	@GetMapping("/fundMaster/{school_id}")
	public ResponseEntity<List<FundAllotment>> getFundMaster(@PathVariable("school_id") long schoolId){
		List<FundAllotment> fundMasters = fundAllotmentService.findBySchoolId(schoolId);
		return ResponseEntity.ok().body(fundMasters);
	}
}
