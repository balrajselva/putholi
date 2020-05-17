package org.putholi.data.core.dao;

import java.util.List;

import org.putholi.data.core.dto.TrackDonationDTO;

interface TrackDonationCustomRepository {
 
    List<TrackDonationDTO> findByTrackingId(String trackingId);
}