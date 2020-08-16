package org.putholi.core.converter;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.putholi.core.dto.TrackDonationDTO;
import org.putholi.core.lookup.PuthuyirLookUp;
import org.putholi.core.model.PreImage;
import org.putholi.core.model.Requirement;
import org.putholi.core.payload.TrackDonationResponsePayLoad;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

public class TrackDonationConverter {

	public TrackDonationResponsePayLoad convert(List<TrackDonationDTO> list,String imgPath) {
		TrackDonationDTO dto = list.get(0);

		System.out.println(dto);
		TrackDonationResponsePayLoad pl = new TrackDonationResponsePayLoad();
		Map<String,Requirement> mapReq = new HashMap<>();
		for (TrackDonationDTO trackDonationDTO : list) {
			String reqId = String.valueOf(trackDonationDTO.getRequirementId());
			PreImage pi = new PreImage();
			pi.setFilePath(trackDonationDTO.getFilepath());
			pi.setImage(getImgFromFS(trackDonationDTO.getFilepath(),imgPath));

			if(mapReq.containsKey(reqId)) {
				Requirement req = mapReq.get(reqId);
				req.getPreImages().add(pi);
			} else {
				Requirement req = new Requirement();
				req.setAssetName(trackDonationDTO.getAssetName());
				req.setAssetType(trackDonationDTO.getAssetType());
				req.setQuantity(trackDonationDTO.getQuantity());
				req.setStatus(PuthuyirLookUp.REQ_ADDED.name());
				req.setRequirementId(trackDonationDTO.getRequirementId());
				List<PreImage> imgList = new ArrayList<>();
				imgList.add(pi);
				req.setPreImages(imgList);
				mapReq.put(String.valueOf(req.getRequirementId()), req);
				pl.getRequirements().add(req);
			}


			/*Quotation qot = new Quotation();
			qot.setItemDescription(trackDonationDTO.getItemDesc());
			qot.setQuantity(trackDonationDTO.getQotQty());
			qot.setTotalAmount(trackDonationDTO.getQotTotalAmt());
			qot.setCompanyName(trackDonationDTO.getQotCompanyName());
			//qot.setInvoiceAmout(trackDonationDTO.getInvoiceAmt());
			qot.setQuotationId(trackDonationDTO.getQuotationId());
			pl.getQuotations().add(qot);
			*/
			/*Expenses exp = new Expenses();
			exp.setQuantity(trackDonationDTO.getQuantity());
			exp.setAmtSpent(trackDonationDTO.getAmtSpent());
			exp.setAssetName(trackDonationDTO.getAssetName());
			exp.setComments(trackDonationDTO.getComments());
			exp.setStatus(trackDonationDTO.getStatus());
			exp.setExpensesId(trackDonationDTO.getExpensesId());
			pl.getExpenses().add(exp);*/
		}
		pl.setAmt(dto.getAmount());
		pl.setBalanceamt(dto.getBalanceamt());
		pl.setCollectedAmt(dto.getCollectedAmt());
		pl.setEstimatedAmt(dto.getEstimatedAmt());

		//pl.setActQty(dto.getActQty());
		//pl.setAmtSpent(dto.getAmtSpent());
		//pl.setExpStatus(dto.getExpStatus());
		//pl.setComments(dto.getComments());

		return pl;
	}
	private byte[] getImgFromFS(String filePath,String imgPath) {
		Path path = Paths.get(imgPath+"\\"+filePath);
		try {
			return Files.readAllBytes(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
