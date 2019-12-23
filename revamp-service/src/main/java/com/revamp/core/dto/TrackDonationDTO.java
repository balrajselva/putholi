package com.revamp.core.dto;

public class TrackDonationDTO {
	private Double amount;
	private Double collectedAmount;
	private Double estimate;
	private Double balanceamt;
	private String assetType;
	private String assetName;
	private Integer quantity;
	private String status;
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public Double getCollectedAmount() {
		return collectedAmount;
	}
	public void setCollectedAmount(Double collectedAmount) {
		this.collectedAmount = collectedAmount;
	}
	public Double getEstimate() {
		return estimate;
	}
	public void setEstimate(Double estimate) {
		this.estimate = estimate;
	}
	public String getAssetType() {
		return assetType;
	}
	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}
	public String getAssetName() {
		return assetName;
	}
	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Double getBalanceamt() {
		return balanceamt;
	}
	public void setBalanceamt(Double balanceamt) {
		this.balanceamt = balanceamt;
	}
}
