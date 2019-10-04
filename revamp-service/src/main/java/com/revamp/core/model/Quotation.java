package com.revamp.core.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

/**
 * The persistent class for the quotation database table.
 * 
 */
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "quotation")
@Data
public class Quotation extends AuditableEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "quotation_id")
	private long quotationId;

	@Column(name = "collected_by")
	private String collectedBy;

	@Column(name = "image_id")
	private long imageId;

	@Column(name = "is_quotation_active")
	private String isQuotationActive;

	private String phone;

	@Column(name = "quotated_amount")
	private long quotatedAmount;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "quotation_date")
	private Date quotationDate;

	@Column(name = "quotation_status")
	private String quotationStatus;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "quotation_validity_date")
	private Date quotationValidityDate;

	private String reviewer;

	@Column(name = "trader_name")
	private String traderName;

	@Column(name = "verified_by")
	private String verifiedBy;

	private String warranty;

	@Column(name = "address_id")
	private long addressId;

	@Column(name = "requirement_id")
	private long requirementId;

	@Column(name = "school_id")
	private long schoolId;

	
}