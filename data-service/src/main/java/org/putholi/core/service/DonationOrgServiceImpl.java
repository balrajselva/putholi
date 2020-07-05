package org.putholi.core.service;

import org.putholi.core.dao.DonationOrgRepository;
import org.putholi.core.model.DonationOrg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
public class DonationOrgServiceImpl implements DonationOrgService {

    @Autowired
    private DonationOrgRepository donationOrgRepository;

    @Override
    public DonationOrg save(DonationOrg donationOrg) {
        return donationOrgRepository.save(donationOrg);
    }
}
