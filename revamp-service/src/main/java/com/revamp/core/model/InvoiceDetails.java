package com.revamp.core.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.revamp.core.lookup.PuthuyirLookUp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "invoice_details")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class InvoiceDetails extends AuditableEntity implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "invoice_details_id")
	private long invoice_details_id;
	
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "invoice_details")
   private Set<InvoiceRequirements> requirements;

	@Column(name = "from_address")
	private String fromAddress;
	
	@Column(name = "to_address")
	private String toAddress;

	@Column(name = "invoice_number")
	private String invoice_Number;
	
	
	@Column(name = "accountNumber")
	private String accountNumber;
	
	@Column(name = "invoice_date")
	private String invoice_date;
	
	@Column(name = "invoice_duedate")
	private String invoice_dueDate;
	
	@Column(name = "bankname")
	private String bankName;
	
	@Column(name = "phoneNumber")
	private String phoneNumber;
	
	@Column(name = "email_Id")
	private String emailId;

	}
