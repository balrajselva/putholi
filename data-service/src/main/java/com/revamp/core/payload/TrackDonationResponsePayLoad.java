package com.revamp.core.payload;

import java.util.ArrayList;
import java.util.List;

import com.revamp.core.model.Requirement;

public class TrackDonationResponsePayLoad {
	private Double amt;
	private Double collectedAmt;
	private Double estimatedAmt;
	private Double balanceamt;
	private List<Requirement> requirements;
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
	public void setRequirements(List<Requirement> requirements) {
		this.requirements = requirements;
	}
	@Override
	public String toString() {
		return "TrackDonationResponsePayLoad [amt=" + amt + ", collectedAmt=" + collectedAmt + ", estimatedAmt="
				+ estimatedAmt + ", requirements=" + requirements + "]";
	}
	
	
	
}
