package org.putholi.core.dao;

import org.putholi.core.model.TrustDonation;
import org.springframework.data.repository.CrudRepository;

public interface TrustDonationRepository extends CrudRepository<TrustDonation, Long> {
    TrustDonation findByOrderId(String orderId);
}
