package org.putholi.core.controller;

import org.putholi.core.model.FundDisbursement;
import org.putholi.core.service.FundDisbursementService;
import org.putholi.core.service.InvoiceService;
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

    @Autowired
    InvoiceService invoiceService;

    @PostMapping("/fundDisbursement")
    public ResponseEntity<String> saveFundDisbursement(@RequestBody FundDisbursement fundDisbursement) {
        System.out.println(fundDisbursement);
        fundDisbursementService.saveFund(fundDisbursement);
        if(fundDisbursement.getAdminComments()!=null) {
            invoiceService.updateAdminComments(fundDisbursement.getInvoiceId(), fundDisbursement.getAdminComments());
        }
        else if(fundDisbursement.getApproverComments()!=null){
            invoiceService.updateApproverComments(fundDisbursement.getInvoiceId(), fundDisbursement.getApproverComments());
        }
        else if(fundDisbursement.getReviewerComments()!=null){
            invoiceService.updateReviewerComments(fundDisbursement.getInvoiceId(), fundDisbursement.getReviewerComments());
        }
        return new ResponseEntity<String>("Save Response", HttpStatus.OK);
    }
}
