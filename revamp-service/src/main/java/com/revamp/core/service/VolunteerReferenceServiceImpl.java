package com.revamp.core.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.revamp.core.dao.VolunteerReferenceRepository;

import com.revamp.core.model.User;
import com.revamp.core.model.VolunteerReference;

@Service
@Transactional
public class VolunteerReferenceServiceImpl implements VolunteerReferenceService{
	
	@Autowired VolunteerReferenceRepository volunteerReferenceRepository;
	
	private boolean isPresent = false;

	@Transactional
	public long save(VolunteerReference vReference) {
		return volunteerReferenceRepository.save(vReference).getId();
	}

	@Transactional
	public boolean verifyReferals(String sponsorEmail, String volunteerEmail) {
		List<VolunteerReference> vReferals=volunteerReferenceRepository.findBySponsorEmail(sponsorEmail);
		vReferals.forEach(volunteer->{
			String[] referalMails=volunteer.getReferalEmails().split(",");
			for(String mail:referalMails){
				if(mail.equals(volunteerEmail)){
					isPresent=true;
					break;
				}
				else{
					continue;
				}
			}
		});
		return isPresent;
	}

}
