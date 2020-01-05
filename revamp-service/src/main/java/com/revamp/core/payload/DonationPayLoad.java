package com.revamp.core.payload;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DonationPayLoad implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	private String projectId;

	private String donorId;

	private String paymentMode;

	private int amount;

	private String paymentStatus;

	private Date createDate;


	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getDonorId() {
		return donorId;
	}

	public void setDonorId(String donorId) {
		this.donorId = donorId;
	}

	@Override
	public String toString() {
		return "DonationPayLoad [projectId=" + projectId + ", donorId=" + donorId + ", paymentMode=" + paymentMode
				+ ", amount=" + amount + ", paymentStatus=" + paymentStatus + ", createDate=" + createDate + "]";
	}

	
}
