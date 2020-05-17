package org.putholi.data.core.service;

import java.util.List;

import org.putholi.data.core.dto.TrackDonationDTO;

public interface TrackDonationService {
	List<TrackDonationDTO> getInfo(String trackingId);
}
