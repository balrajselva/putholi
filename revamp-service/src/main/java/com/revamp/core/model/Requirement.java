package com.revamp.core.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.Proxy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.revamp.core.lookup.PuthuyirLookUp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "requirement")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Getter
@Setter
public class Requirement extends AuditableEntity {

	private static final long serialVersionUID = -7230483495700936141L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "requirement_id", nullable = false)
	private long requirementId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "project_id", nullable = false)
	@JsonBackReference
	private Project project;

	@Column(name = "reqtype")
	private String reqType;

	@Column(name = "assettype")
	private String assetType;

	@Column(name = "assetname")
	private String assetName;

	@Column(name = "quantity")
	private int quantity;

	@Column(name = "estimate")
	private Integer estimate;

	@Column(name = "collected_amount")
	private Integer collectedAmount = 0;
	
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private PuthuyirLookUp status;
	
	@Column(name = "priority")
	private String priority;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;
	
}
