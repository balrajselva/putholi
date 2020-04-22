package com.revamp.core.payload;

import java.util.ArrayList;
import java.util.List;

import com.revamp.core.model.Expenses;
import com.revamp.core.model.Quotation;
import com.revamp.core.model.Requirement;

public class TrackDonationResponsePayLoad {
	private Double amt;
	private Double collectedAmt;
	private Double estimatedAmt;
	private Double balanceamt;
	private List<Requirement> requirements;

	private Double actQty;
	private Double amtSpent;
	private String expStatus;
	private String comments;
	private List<Expenses> expenses;

	// quotation
	private String itemDesc;
	private Double qotQty;
	private Double qotTotalAmt;
	private String qotCompanyName;
	private Double invoiceAmt;
	private List<Quotation> quotations;

	public Double getAmt() {
		return amt;
	}

	public void setAmt(Double amt) {
		this.amt = amt;
	}

	public Double getCollectedAmt() {
		return collectedAmt;
	}

	public void setCollectedAmt(Double collectedAmt) {
		this.collectedAmt = collectedAmt;
	}

	public Double getEstimatedAmt() {
		return estimatedAmt;
	}

	public void setEstimatedAmt(Double estimatedAmt) {
		this.estimatedAmt = estimatedAmt;
	}

	public Double getBalanceamt() {
		return balanceamt;
	}

	public void setBalanceamt(Double balanceamt) {
		this.balanceamt = balanceamt;
	}

	public List<Requirement> getRequirements() {
		if (requirements == null) {
			requirements = new ArrayList<Requirement>();
		}
		return requirements;
	}

	public List<Quotation> getQuotations() {
		if (quotations == null) {
			quotations = new ArrayList<Quotation>();
		}
		return quotations;
	}
	
	public List<Expenses> getExpenses() {
		if (expenses == null) {
			expenses = new ArrayList<Expenses>();
		}
		return expenses;
	}
	
	public void setRequirements(List<Requirement> requirements) {
		this.requirements = requirements;
	}
	
	

	public Double getActQty() {
		return actQty;
	}

	public void setActQty(Double actQty) {
		this.actQty = actQty;
	}

	public Double getAmtSpent() {
		return amtSpent;
	}

	public void setAmtSpent(Double amtSpent) {
		this.amtSpent = amtSpent;
	}

	public String getExpStatus() {
		return expStatus;
	}

	public void setExpStatus(String expStatus) {
		this.expStatus = expStatus;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}
	
	 

	public String getItemDesc() {
		return itemDesc;
	}

	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}

	public Double getQotQty() {
		return qotQty;
	}

	public void setQotQty(Double qotQty) {
		this.qotQty = qotQty;
	}

	public Double getQotTotalAmt() {
		return qotTotalAmt;
	}

	public void setQotTotalAmt(Double qotTotalAmt) {
		this.qotTotalAmt = qotTotalAmt;
	}

	public String getQotCompanyName() {
		return qotCompanyName;
	}

	public void setQotCompanyName(String qotCompanyName) {
		this.qotCompanyName = qotCompanyName;
	}

	public Double getInvoiceAmt() {
		return invoiceAmt;
	}

	public void setInvoiceAmt(Double invoiceAmt) {
		this.invoiceAmt = invoiceAmt;
	}

	@Override
	public String toString() {
		return "TrackDonationResponsePayLoad [amt=" + amt + ", collectedAmt=" + collectedAmt + ", estimatedAmt="
				+ estimatedAmt + ", requirements=" + requirements + "]";
	}

}
