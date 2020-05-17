package org.putholi.data.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.putholi.data.core.dao.DonationUserRepository;
import org.putholi.data.core.model.DonationUser;

@Service
@Transactional(readOnly = true)
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
