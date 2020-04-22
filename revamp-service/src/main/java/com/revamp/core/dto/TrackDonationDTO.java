package com.revamp.core.dto;

import lombok.Data;

@Data
public class TrackDonationDTO {
	private Double amount;
	private Double collectedAmt;
	private Double estimatedAmt;
	private Double balanceamt;
	private String assetType;
	private String assetName;
	private Integer quantity;
	private String status;
	private long requirementId;
	
	//Expenses
	private long expensesId;
	private Double actQty;
	private Double amtSpent;
	private String expStatus;
	private String comments;
	
	//quotation
	private long quotationId;
	private String itemDesc;
	private Double qotQty;
	private Double qotTotalAmt;
	private String qotCompanyName;
	private Double invoiceAmt;

	private long projectId;
	
	
	
}
