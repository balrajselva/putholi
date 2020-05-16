package com.revamp.core.controller;

import com.revamp.core.model.FundDisbursement;
import com.revamp.core.service.FundDisbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FundDisbursementController {

    @Autowired
    FundDisbursementService fundDisbursementService;

    @PostMapping("/fundDisbursement")
    public ResponseEntity<String> saveFundDisbursement(@RequestBody FundDisbursement fundDisbursement) {
        System.out.println(fundDisbursement);
        fundDisbursementService.saveFund(fundDisbursement);
        return new ResponseEntity<String>("Save Response", HttpStatus.OK);
    }
}
