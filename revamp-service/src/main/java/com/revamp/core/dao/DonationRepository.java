package com.revamp.core.dao;

import org.springframework.data.repository.CrudRepository;

import com.revamp.core.model.Donation;

public interface DonationRepository extends CrudRepository<Donation, Long> {

}
