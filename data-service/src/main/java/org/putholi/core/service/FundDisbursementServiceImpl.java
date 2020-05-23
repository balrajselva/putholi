package org.putholi.core.service;

import org.putholi.core.dao.FundDisbursementRepository;
import org.putholi.core.model.FundDisbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FundDisbursementServiceImpl implements FundDisbursementService {

    @Autowired
    FundDisbursementRepository fundDisbursementRepository;

    @Override
    public void saveFund(FundDisbursement fundDisbursement) {
        fundDisbursementRepository.save(fundDisbursement);
    }
}
