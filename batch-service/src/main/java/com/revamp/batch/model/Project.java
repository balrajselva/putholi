package com.revamp.batch.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "project")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(ignoreUnknown = true)
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class Project implements java.io.Serializable {

	private static final long serialVersionUID = -5416628745442805358L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "project_id", nullable = false)
	private long projectId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "school_id")
	@JsonIgnore
	private School school;

	@Column(name = "collected_amount")
	private int collectedAmount;

	

	
}
