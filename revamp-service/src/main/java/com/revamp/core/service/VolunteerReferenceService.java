package com.revamp.core.service;

import com.revamp.core.model.VolunteerReference;

public interface VolunteerReferenceService {

	long save(VolunteerReference vReference);

	boolean verifyReferals(String sponsorEmail, String volunteerEmail);

}

