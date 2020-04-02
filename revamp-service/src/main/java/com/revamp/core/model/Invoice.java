package com.revamp.core.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "invoice")
@EntityListeners(AuditingEntityListener.class)
@Data
public class Invoice extends AuditableEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "invoice_id")
	private long id;

	private String admin;

	private String approver;

	private String reviewer;

	@Column(name = "company_name")
	private String companyName;

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

	private String quantity;

	private String discountDetails;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "invoice_date")
	private Date invoiceDate;

	@Column(name = "invoice_prepared_by")
	private String invoicePreparedBy;

	@Column(name="item_description")
	private String itemDescription;

	@Column(name="unit_price")
	private String unitPrice;

	private String tax;

	@Column(name = "shipping_cost")
	private String shippingCost;

	private String totalAmount;

	@Column(name = "work_status")
	private String workStatus;

	@Column(name = "bank_name")
	private String bankName;

	@Column(name = "ifsc")
	private String ifsc;

	@Column(name = "accountNum")
	private String accountNum;

	@Column(name = "payment_mode")
	private String paymentMode;

	@OneToMany(fetch = FetchType.EAGER,  mappedBy = "invoice" ,cascade = CascadeType.ALL)
	private Set<InvoiceImage> invoiceImages;

	@JsonProperty("proofOfId")
	@Transient
	private ProofOfId proofOfId;

}
