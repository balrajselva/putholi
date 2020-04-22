package com.revamp.core.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

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

	@Column(name = "is_quotation_active")
	private String isQuotationActive;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "quotation_date")
	private Date quotationDate;

	@Column(name = "quotation_status")
	private String quotationStatus;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "quotation_validity_date")
	private Date quotationValidityDate;

	@Column(name = "quotation_prepared_by")
	private String quotationPreparedBy;

	private String admin;

	private String approver;

	private String reviewer;

	@Column(name = "company_name")
	private String companyName;

	private String warranty;

	@Column(name = "requirement_id")
	private long requirementId;

	@Column(name = "project_id")
	private Long projectId;

	@Column(name = "school_id")
	private long schoolId;

	private String address_line_1;

	private String phoneNumber;

	private String comment;

	private String city;
	
	private String street;
	
	private String pincode;
	
	private double quantity;
	
	private String discountDetails;

	@Column(name="item_description")
	private String itemDescription;

	@Column(name="unit_price")
	private String unitPrice;

	private String tax;

	@Column(name = "shipping_cost")
	private String shippingCost;

	private double totalAmount;

	@OneToMany(fetch = FetchType.EAGER,  mappedBy = "quotation" ,cascade = CascadeType.ALL)
	private Set<QuotationImage> quotationImages;

	@JsonProperty("proofOfId")
	@Transient
	private ProofOfId proofOfId;
	
	@Transient
	private double invoiceAmout;
	
	@JsonProperty("imageDetails")
	@Transient
	private List<ImageDetails> imageDetails;

}