package org.putholi.core.service;

import org.putholi.core.dao.VolunteerReferenceRepository;
import org.putholi.core.model.VolunteerReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
@Transactional
public class VolunteerReferenceServiceImpl implements VolunteerReferenceService{
	
	@Autowired
	VolunteerReferenceRepository volunteerReferenceRepository;

	@Transactional
	public long save(VolunteerReference vReference) {
		return volunteerReferenceRepository.save(vReference).getVolunterReferenceId();
	}

	@Transactional
	public boolean verifyReferals(String sponsorEmail, String volunteerEmail) {
		AtomicReference<Boolean> isPresent = new AtomicReference<>(false);
		List<VolunteerReference> vReferals=volunteerReferenceRepository.findBySponsorEmail(sponsorEmail);
		vReferals.forEach(volunteer->{
			String[] referalMails=volunteer.getReferalEmails().split(",");
			for(String mail:referalMails){
				if(mail.equals(volunteerEmail)){
					isPresent.set(true);
					break;
				}
				else{
					continue;
				}
			}
		});
		return isPresent.get();
	}

}
