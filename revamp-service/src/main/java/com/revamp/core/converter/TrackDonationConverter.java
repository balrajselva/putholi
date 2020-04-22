package com.revamp.core.converter;

import java.util.List;

import com.revamp.core.dto.TrackDonationDTO;
import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.model.Expenses;
import com.revamp.core.model.Quotation;
import com.revamp.core.model.Requirement;
import com.revamp.core.payload.TrackDonationResponsePayLoad;

public class TrackDonationConverter {
	public TrackDonationResponsePayLoad convert(List<TrackDonationDTO> list) {
		TrackDonationDTO dto = list.get(0);
		
		System.out.println(dto);
		TrackDonationResponsePayLoad pl = new TrackDonationResponsePayLoad();
		for (TrackDonationDTO trackDonationDTO : list) {
			Requirement req = new Requirement();
			req.setAssetName(trackDonationDTO.getAssetName());
			req.setAssetType(trackDonationDTO.getAssetType());
			req.setQuantity(trackDonationDTO.getQuantity());
			req.setStatus(PuthuyirLookUp.REQ_ADDED);
			req.setRequirementId(trackDonationDTO.getRequirementId());
			pl.getRequirements().add(req);
			
			Quotation qot = new Quotation();
			qot.setItemDescription(trackDonationDTO.getItemDesc());
			qot.setQuantity(trackDonationDTO.getQotQty());
			qot.setTotalAmount(trackDonationDTO.getQotTotalAmt());
			qot.setCompanyName(trackDonationDTO.getQotCompanyName());
			qot.setInvoiceAmout(trackDonationDTO.getInvoiceAmt());
			qot.setQuotationId(trackDonationDTO.getQuotationId());
			pl.getQuotations().add(qot);
			
			Expenses exp = new Expenses();
			exp.setQuantity(trackDonationDTO.getQuantity());
			exp.setAmtSpent(trackDonationDTO.getAmtSpent());
			exp.setAssetName(trackDonationDTO.getAssetName());
			exp.setComments(trackDonationDTO.getComments());
			exp.setStatus(trackDonationDTO.getStatus());
			exp.setExpensesId(trackDonationDTO.getExpensesId());
			pl.getExpenses().add(exp);
		}
		pl.setAmt(dto.getAmount());
		pl.setBalanceamt(dto.getBalanceamt());
		pl.setCollectedAmt(dto.getCollectedAmt());
		pl.setEstimatedAmt(dto.getEstimatedAmt());
		
		pl.setActQty(dto.getActQty());
		pl.setAmtSpent(dto.getAmtSpent());
		pl.setExpStatus(dto.getExpStatus());
		pl.setComments(dto.getComments());
		
		
		
		
		
		return pl;
	}
}
