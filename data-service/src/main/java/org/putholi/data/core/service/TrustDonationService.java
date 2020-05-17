package org.putholi.data.core.service;

import org.putholi.data.core.model.TrustDonation;

public interface TrustDonationService {
    TrustDonation saveTrustUser(TrustDonation donation);

    TrustDonation getByOrderId(String orderId);
}
