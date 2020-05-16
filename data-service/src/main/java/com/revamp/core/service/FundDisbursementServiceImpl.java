package com.revamp.core.service;

import com.revamp.core.dao.FundDisbursementRepository;
import com.revamp.core.model.FundAllotment;
import com.revamp.core.model.FundDisbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FundDisbursementServiceImpl implements FundDisbursementService {

    @Autowired
    FundDisbursementRepository fundDisbursementRepository;

    @Override
    public void saveFund(FundDisbursement fundDisbursement) {
        fundDisbursementRepository.save(fundDisbursement);
    }
}
