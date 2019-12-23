package com.revamp.core.converter;

import java.util.List;

import com.revamp.core.dto.TrackDonationDTO;
import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.model.Requirement;
import com.revamp.core.payload.TrackDonationResponsePayLoad;

public class TrackDonationConverter {
	public TrackDonationResponsePayLoad convert(List<TrackDonationDTO> list) {
		TrackDonationDTO dto = list.get(0);
		TrackDonationResponsePayLoad pl = new TrackDonationResponsePayLoad();
		for (TrackDonationDTO trackDonationDTO : list) {
			Requirement req = new Requirement();
			req.setAssetName(trackDonationDTO.getAssetName());
			req.setAssetType(trackDonationDTO.getAssetType());
			req.setQuantity(trackDonationDTO.getQuantity());
			req.setStatus(PuthuyirLookUp.REQ_ADDED); 
			pl.getRequirements().add(req);
		}
		pl.setAmt(dto.getAmount());
		pl.setBalanceamt(dto.getBalanceamt());
		pl.setCollectedAmt(dto.getCollectedAmount());
		pl.setEstimatedAmt(dto.getEstimate());
		return pl;
	}
}
