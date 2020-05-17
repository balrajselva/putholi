package org.putholi.data.core.service;

import org.putholi.data.core.model.VolunteerReference;

public interface VolunteerReferenceService {

	long save(VolunteerReference vReference);

	boolean verifyReferals(String sponsorEmail, String volunteerEmail);

}

