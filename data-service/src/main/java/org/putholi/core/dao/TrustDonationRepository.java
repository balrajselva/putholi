package org.putholi.core.dao;

import org.putholi.core.model.TrustDonation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TrustDonationRepository extends CrudRepository<TrustDonation, Long> {
    TrustDonation findByOrderId(@Param("orderId")String orderId);
}
