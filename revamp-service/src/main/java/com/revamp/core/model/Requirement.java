package com.revamp.core.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Proxy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.revamp.core.lookup.PuthuyirLookUp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "requirement")
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class Requirement implements java.io.Serializable {

	private static final long serialVersionUID = -7230483495700936141L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "requirement_id", nullable = false)
	private long requirementId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "project_id", nullable = false)
	@JsonIgnore
	private Project project;

	@Column(name = "reqtype")
	private String reqType;

	@Column(name = "assettype")
	private String assetType;

	@Column(name = "assetname")
	private String assetName;

	@Column(name = "quantity")
	private int quantity;
	
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private PuthuyirLookUp status;

	@Column(name = "date_created")
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateAdded;
	
	@Column(name = "priority")
	private String priority;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;
	
}
