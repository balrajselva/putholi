package com.revamp.core.service;

import com.revamp.core.model.Donation;
import com.revamp.core.model.TrustDonation;

public interface TrustDonationService {
    TrustDonation saveTrustUser(TrustDonation donation);

    TrustDonation getByOrderId(String orderId);
}
