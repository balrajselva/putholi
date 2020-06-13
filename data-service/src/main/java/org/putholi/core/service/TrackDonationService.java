package org.putholi.core.service;

import org.putholi.core.dto.TrackDonationDTO;

import java.util.List;

public interface TrackDonationService {
	List<TrackDonationDTO> getInfo(String trackingId);
}
