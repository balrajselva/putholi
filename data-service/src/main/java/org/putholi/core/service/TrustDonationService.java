package org.putholi.core.service;

import org.putholi.core.model.TrustDonation;

public interface TrustDonationService {
    TrustDonation saveTrustUser(TrustDonation donation);

    TrustDonation getByOrderId(String orderId);
}
