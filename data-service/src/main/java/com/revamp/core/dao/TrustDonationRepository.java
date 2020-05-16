package com.revamp.core.dao;

import com.revamp.core.model.TrustDonation;
import org.springframework.data.repository.CrudRepository;

public interface TrustDonationRepository extends CrudRepository<TrustDonation, Long> {
    TrustDonation findByOrderId(String orderId);
}
