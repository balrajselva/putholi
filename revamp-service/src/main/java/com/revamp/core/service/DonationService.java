package com.revamp.core.service;

import com.revamp.core.model.Donation;
import com.revamp.core.payload.DonationPayLoad;

public interface DonationService {

	Donation donate(Donation donation);

	Donation get(long id);
	
	Donation donate(DonationPayLoad donationPayLoad);

}
