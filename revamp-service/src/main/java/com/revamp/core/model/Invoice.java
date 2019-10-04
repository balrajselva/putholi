package com.revamp.core.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

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
	@GeneratedValue
	@Column(name = "invoice_id")
	private Long id;

	@Column(name = "name")
	private String name;
	@Column(name = "mimeType")
	private String mimeType;
	@Column(name = "file")
	private byte[] file;
	@Column(name="project_id")
	private Long projectId;

	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "invoice_details_id")
	private InvoiceDetails invoiceDetails;
	public Invoice(String name, String mimeType, byte[] file) {
		this.name = name;
		this.mimeType = mimeType;
		this.file = file;

	}
	
}
