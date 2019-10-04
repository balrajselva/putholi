package com.revamp.core.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(ignoreUnknown = true)
@Proxy(lazy = false)
@Data
@Getter (AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
public class User  extends AuditableEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userid", nullable = false)
	private long userid;

	@Column(name = "firstname")
	private String firstName;

	@Column(name = "lastname")
	private String lastName;
	
	@Column(name="gender")
	private String gender;
	
	@Column(name="sponsorname")
	private String sponsorName;
	
	@Column(name="sponsormail")
	private String sponsorEmail;
	
	@Column(name = "role")
	private String role;
	
	@Column(name = "comments")
	private String comments;

	@Column(name = "phonenumber")
	private String phoneNumber;

	@Column(name = "emailaddress")
	@Getter(AccessLevel.PUBLIC) 
	@Setter(AccessLevel.PUBLIC)
	private String emailAddress;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;

	@Column(name = "status")
	private String status;

	@Column(name = "password")
	private String password;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "proof_id")
	private IdentityProof proof;
	
}
