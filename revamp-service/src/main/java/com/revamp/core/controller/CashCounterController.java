package com.revamp.core.controller;

import com.revamp.core.model.CashCounter;
import com.revamp.core.service.CashCounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost")
@RestController
public class CashCounterController {

    @Value("${bank.processing.fee}")
    private String processingFee;

    @Value("${adjustable.amount}")
    private String adjustableAmount;

    @Autowired
    private CashCounterService cashCounterService;

    @GetMapping("/getProcessingFee")
    public ResponseEntity<String> getProcessingFee(){
        return ResponseEntity.ok(processingFee);
    }

    @GetMapping("/getAdjustableAmount")
    public ResponseEntity<String> getAdjustableAmount(){
        return ResponseEntity.ok(adjustableAmount);
    }
}
