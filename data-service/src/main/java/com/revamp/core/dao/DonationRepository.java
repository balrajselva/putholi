package com.revamp.core.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.revamp.core.model.Donation;

public interface DonationRepository extends CrudRepository<Donation, Long>,TrackDonationCustomRepository {
    @Query("FROM Donation d where d.orderId = :orderId")
    Donation findByOrderId(String orderId);
}
