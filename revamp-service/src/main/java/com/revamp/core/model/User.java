package com.revamp.core.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;


@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Data
@Getter (AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
@ToString
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

	@Column(name = "emailaddress",unique = true)
	@Email
	private String emailAddress;

	@Column(name = "status")
	private String status;

	@Column(name = "password")
	private String password;

	@JsonManagedReference
	@OneToOne(cascade = CascadeType.ALL)
	private Address address;

	@JsonManagedReference
	@OneToOne(cascade = CascadeType.ALL)
	private IdentityProof identityProof;
	
}
