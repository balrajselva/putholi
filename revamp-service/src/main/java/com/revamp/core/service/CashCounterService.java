package com.revamp.core.service;

import com.revamp.core.model.CashCounter;
import com.revamp.core.model.Donation;
import com.revamp.core.model.TrustDonation;
import org.springframework.http.ResponseEntity;

public interface CashCounterService {

    Boolean saveInflowCashDonor(Donation donation);

    Boolean saveInflowCashTrust(TrustDonation donation);

}
