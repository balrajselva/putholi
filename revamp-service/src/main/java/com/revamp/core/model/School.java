package com.revamp.core.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "school")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@ToString
public class School extends AuditableEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "school_id", nullable = false)
	private long schoolId;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "school_info_id")
	private SchoolInfo schoolInfo;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "contacts_id")
	private Contacts contacts;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "address_id")
	private Address address;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "school")
	private Set<Project> projects;

	@Column(name = "school_status")
	@JsonProperty("schoolStatus")
	private String schoolStatus;

	@Column(name = "enable_donation")
	@JsonProperty("enable_donation")
	private String enableDonation;

	@JsonProperty("proofOfId")
	@Transient
	private ProofOfId proofOfId;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name ="volunteer_id", nullable = true)
	private Long volunteerId;
	
	@OneToMany(fetch = FetchType.EAGER,  mappedBy = "school" ,cascade = CascadeType.ALL)
	private Set<SchoolImage> schoolImages;
	
	
	@Transient
	private List<Requirement> requirements;

	public School(){

    }
	public School (String schoolId){
		this.schoolId=Long.parseLong(schoolId);
	}
}
