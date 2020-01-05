package com.revamp.core.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

/**
 * 
 * @author Puthyir Dev Team
 *
 */
@Entity
@Table(name = "fundallotment")
@EntityListeners(AuditingEntityListener.class)
@Data
public class FundAllotment extends AuditableEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="fundallotment_id")
	private long fundallotmentId;
	@Column(name="user_id")
	private long userId;
	
	@Column(name="requirement_id")
	private long requirementId;
	
	@Column(name = "collected_date")
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	private Date collected_date;
	@Column(name="totalamount")
	private long totalamount;
	
	@Column(name="interest")
	private long interest;
	
	@Column(name = "allocated_date")
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	private Date allocated_date;
	
	@Column(name = "updated_date")
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	private Date updated_date;
	
}
