package com.revamp.core.model;

import java.math.BigInteger;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "volunteer_reference")
@EntityListeners(AuditingEntityListener.class)
@Data
@Getter (AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
public class VolunteerReference extends AuditableEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "volunteer_reference_id", nullable = false)
	private long volunterReferenceId;
	
	@Column(name="sponsor_name")
	private String sponsorName;
	
	@Column(name="sponsor_email")
	private String sponsorEmail;
	
	@Column(name="referalmails")
	private String referalEmails;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;

}
