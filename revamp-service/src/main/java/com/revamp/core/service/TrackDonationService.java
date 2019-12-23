package com.revamp.core.service;

import java.util.List;

import com.revamp.core.dto.TrackDonationDTO;

public interface TrackDonationService {
	List<TrackDonationDTO> getInfo(String trackingId);
}
