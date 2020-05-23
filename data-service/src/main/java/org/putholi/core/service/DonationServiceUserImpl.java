package org.putholi.core.service;

import org.putholi.core.dao.DonationUserRepository;
import org.putholi.core.model.DonationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
public class DonationServiceUserImpl implements DonationUserService {

	@Autowired 
	private DonationUserRepository donationUserRepo;
	
	@Transactional
	public DonationUser save(DonationUser donation) {
		
		return donationUserRepo.save(donation);
	}

	public DonationUser findByEmailAddress(String email) {
		return donationUserRepo.findByEmailAddress(email);
	}

	
	public DonationUser findByEmailAddressPassword(String emailAddress, String password) {
		return donationUserRepo.findByEmailAddressPassword(emailAddress, password);
	}

	
	
}
