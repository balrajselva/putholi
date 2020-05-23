package org.putholi.core.dao;

import org.putholi.core.dto.TrackDonationDTO;

import java.util.List;

interface TrackDonationCustomRepository {
 
    List<TrackDonationDTO> findByTrackingId(String trackingId);
}