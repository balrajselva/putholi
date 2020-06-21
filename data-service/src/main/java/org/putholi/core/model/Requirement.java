package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "requirement")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Getter
@Setter
@ToString
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
	private String status;

	@Column(name = "invoice_status")
	private String invoiceStatus;

	@Column(name = "priority")
	private String priority;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(fetch = FetchType.EAGER,  mappedBy = "requirement" ,cascade = CascadeType.ALL)
	@Fetch(value = FetchMode.SUBSELECT)
	private List<PreImage> preImages;

	public Requirement() {
	}

	public Requirement (String requirementId){
		this.requirementId=Long.parseLong(requirementId);
	}
}
