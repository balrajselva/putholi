package org.putholi.core.service;

import org.putholi.core.model.DonationUser;

public interface DonationUserService {
	DonationUser save(DonationUser donation);
	DonationUser findByEmailAddress(String email);
	DonationUser findByEmailAddressPassword(String emailAddress,String password);
		
	
}
