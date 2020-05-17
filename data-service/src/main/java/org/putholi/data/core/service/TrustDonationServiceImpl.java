package org.putholi.data.core.service;

import org.putholi.data.core.dao.TrustDonationRepository;
import org.putholi.data.core.model.TrustDonation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TrustDonationServiceImpl implements TrustDonationService {
    @Autowired
    private TrustDonationRepository trustDonationRepository;

    @Override
    public TrustDonation saveTrustUser(TrustDonation donation) {
        return trustDonationRepository.save(donation);
    }

    @Override
    public TrustDonation getByOrderId(String orderId) {
        return trustDonationRepository.findByOrderId(orderId);
    }
}
