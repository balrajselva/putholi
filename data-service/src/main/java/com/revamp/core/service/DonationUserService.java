package com.revamp.core.service;

import com.revamp.core.model.DonationUser;

public interface DonationUserService {
	DonationUser save(DonationUser donation);
	DonationUser findByEmailAddress(String email);
	DonationUser findByEmailAddressPassword(String emailAddress,String password);
		
	
}
