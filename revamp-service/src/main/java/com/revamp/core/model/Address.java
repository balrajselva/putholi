package com.revamp.core.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.revamp.core.lookup.PuthuyirLookUp;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "address")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class Address extends AuditableEntity implements java.io.Serializable {

	private static final long serialVersionUID = 1956522127988632591L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;

	@Column(name = "address_line_1")
	private String addressLine1;

	@Column(name = "address_line_2")
	private String addressLine2;

	@Column(name = "district")
	private String district;

	@Column(name = "city")
	private String city;

	@Column(name = "locality")
	private String locality;

	@Column(name = "pincode")
	private String pinCode;

	@Column(name = "state")
	private String state;

	@Column(name="country")
	private String country;
	
}
