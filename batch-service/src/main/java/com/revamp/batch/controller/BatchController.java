package com.revamp.batch.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revamp.batch.model.School;
import com.revamp.batch.services.BatchServices;
import com.revamp.batch.util.BatchConstants;
/**
 * 
 * @author Puthyir DevTeam
 *
 */
@RestController
public class BatchController {
	private final static Logger logger = LoggerFactory.getLogger(BatchController.class);

	@Autowired
	private BatchServices batchServices;

	// ---Get a user by id---
	@GetMapping("/status")
	public ResponseEntity<List<School>> getFundWatcher(@RequestParam("status") String pstatus ,@RequestParam("days") String days) {
		logger.info("BatchController Status");
		List<School> list = batchServices.findbySchoolStatus(pstatus);
		String status = batchServices.updateSchoolStatus(list,days);
		if (status.equalsIgnoreCase(BatchConstants.SUCCESS)) {
			return new ResponseEntity("FundWatcher ran succesfully", HttpStatus.OK);
		} else {
			return new ResponseEntity("FundWatcher ran unsuccesfully", HttpStatus.OK);
		}
	}

}
