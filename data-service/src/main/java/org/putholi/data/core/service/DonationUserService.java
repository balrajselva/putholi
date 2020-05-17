package org.putholi.data.core.service;

import org.putholi.data.core.model.DonationUser;

public interface DonationUserService {
	DonationUser save(DonationUser donation);
	DonationUser findByEmailAddress(String email);
	DonationUser findByEmailAddressPassword(String emailAddress,String password);
		
	
}
