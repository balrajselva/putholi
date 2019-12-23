package com.revamp.core.dao;

import java.util.List;

import com.revamp.core.dto.TrackDonationDTO;

interface TrackDonationCustomRepository {
 
    List<TrackDonationDTO> findByTrackingId(String trackingId);
}