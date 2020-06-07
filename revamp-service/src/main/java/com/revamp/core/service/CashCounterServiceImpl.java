package com.revamp.core.service;

import com.revamp.core.dao.CashCounterRepository;
import com.revamp.core.model.CashCounter;
import com.revamp.core.model.Donation;
import com.revamp.core.model.TrustDonation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;

@Service
@Transactional(readOnly = false)
public class CashCounterServiceImpl implements CashCounterService {
    @Autowired
    CashCounterRepository cashCounterRepository;

    @Override
    public Boolean saveInflowCashDonor(Donation donation) {
        // There will always be only one record in casCounter table
        CashCounter cashCounter = cashCounterRepository.findById(1L).get();
        cashCounter.setTotalAvailableBalance(cashCounter.getTotalAvailableBalance().add(BigInteger.valueOf(donation.getAmount())));
        cashCounter.setTotalInflowCashDonor(cashCounter.getTotalInflowCashDonor().add(BigInteger.valueOf(donation.getAmount())));
        cashCounter.setTotalDonorBalance(cashCounter.getTotalDonorBalance().add(BigInteger.valueOf(donation.getAmount())));
        cashCounterRepository.save(cashCounter);
        return Boolean.TRUE;
    }

    @Override
    public Boolean saveInflowCashTrust(TrustDonation donation) {
        // There will always be only one record in casCounter table
        CashCounter cashCounter = cashCounterRepository.findById(1L).get();
        cashCounter.setTotalAvailableBalance(cashCounter.getTotalAvailableBalance().add(BigInteger.valueOf(donation.getAmount())));
        cashCounter.setTotalInflowCashTrust(cashCounter.getTotalInflowCashTrust().add(BigInteger.valueOf(donation.getAmount())));
        cashCounter.setTotalTrustBalance(cashCounter.getTotalTrustBalance().add(BigInteger.valueOf(donation.getAmount())));
        cashCounterRepository.save(cashCounter);
        return Boolean.TRUE;
    }
}
