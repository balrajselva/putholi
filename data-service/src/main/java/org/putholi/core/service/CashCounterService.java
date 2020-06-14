package org.putholi.core.service;

import org.putholi.core.model.Donation;
import org.putholi.core.model.TrustDonation;

public interface CashCounterService {

    Boolean saveInflowCashDonor(Donation donation);

    Boolean saveInflowCashTrust(TrustDonation donation);

}
