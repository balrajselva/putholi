package org.putholi.core.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;

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
