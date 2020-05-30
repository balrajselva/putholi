package com.revamp.email.model;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Proxy;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class Requirement extends AuditableEntity implements java.io.Serializable{

	private static final long serialVersionUID = -7230483495700936141L;

	private long requirementId;

	private String reqType;

	private String assetType;

	private String assetName;

	private int quantity;

	private Integer estimate;

	private Integer collectedAmount = 0;

	private String status;

	private Date dateAdded;
	
	private String priority;

    @JsonIgnore
	private String user;

    @JsonIgnore
	private String postImages;

	@JsonIgnore
	private String preImages;
	
	@JsonIgnore
	private String invoiceStatus;
	

}
