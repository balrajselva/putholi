package org.putholi.data.core.dao;

import org.putholi.data.core.model.TrustDonation;
import org.springframework.data.repository.CrudRepository;

public interface TrustDonationRepository extends CrudRepository<TrustDonation, Long> {
    TrustDonation findByOrderId(String orderId);
}
