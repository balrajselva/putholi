package com.revamp.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Table(name = "invoice_requirements")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Data
public class InvoiceRequirements extends AuditableEntity implements java.io.Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "requirement_id")
	private long requirement_id;
	@Column(name = "qty")
	private String qty;
	@Column(name = "subTotal")
	private String subTotal;
	@Column(name = "price")
	private String price;
	@Column(name = "descriptions")
	private String descriptions;
	}
