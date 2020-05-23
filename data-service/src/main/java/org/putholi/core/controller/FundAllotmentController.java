package org.putholi.core.controller;

import org.putholi.core.model.FundAllotment;
import org.putholi.core.service.FundAllotmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
