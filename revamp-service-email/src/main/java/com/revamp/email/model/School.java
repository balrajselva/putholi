package com.revamp.email.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "school")
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class School implements java.io.Serializable {

	private static final long serialVersionUID = 8607633702511344481L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "school_id", nullable = false)
	private long schoolId;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "school_info_id")
	private SchoolInfo schoolInfo;


	}
