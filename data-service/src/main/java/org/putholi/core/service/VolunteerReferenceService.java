package org.putholi.core.service;

import org.putholi.core.model.VolunteerReference;

public interface VolunteerReferenceService {

	long save(VolunteerReference vReference);

	boolean verifyReferals(String sponsorEmail, String volunteerEmail);

}

