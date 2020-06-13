package org.putholi.core.converter;

import org.putholi.core.dto.TrackDonationDTO;
import org.putholi.core.model.Requirement;
import org.putholi.core.payload.TrackDonationResponsePayLoad;

import java.util.List;

public class TrackDonationConverter {
	public TrackDonationResponsePayLoad convert(List<TrackDonationDTO> list) {
		TrackDonationDTO dto = list.get(0);
		TrackDonationResponsePayLoad pl = new TrackDonationResponsePayLoad();
		for (TrackDonationDTO trackDonationDTO : list) {
			Requirement req = new Requirement();
			req.setAssetName(trackDonationDTO.getAssetName());
			req.setAssetType(trackDonationDTO.getAssetType());
			req.setQuantity(trackDonationDTO.getQuantity());
			req.setStatus("REQ_ADDED");
			pl.getRequirements().add(req);
		}
		pl.setAmt(dto.getAmount());
		pl.setBalanceamt(dto.getBalanceamt());
		pl.setCollectedAmt(dto.getCollectedAmount());
		pl.setEstimatedAmt(dto.getEstimate());
		return pl;
	}
}
