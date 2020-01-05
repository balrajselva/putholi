package com.revamp.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import lombok.Data;

@Entity
@Table(name = "donation_user")
@Data
public class DonationUser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "donation_userid")
	private long donationuserid;

	@Column(name = "firstname")
	private String firstName;

	@Column(name = "lastname")
	private String lastName;
	
	@Column(name = "phonenumber")
	private String phoneNumber;
	
	@Column(name = "password")
	private String password;

	@Column(name = "emailaddress",unique = true)
	@Email
	private String emailAddress;
}
