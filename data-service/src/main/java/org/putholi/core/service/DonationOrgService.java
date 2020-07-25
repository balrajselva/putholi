package org.putholi.core.service;

import org.putholi.core.model.DonationOrg;

public interface DonationOrgService {

    DonationOrg save(DonationOrg donationOrg);

    DonationOrg findByEmailAddressPassword(String orgEmail, String password);

    DonationOrg findByEmailAddress(String orgEmail);
}
