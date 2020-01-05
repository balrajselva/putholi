package com.revamp.batch.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
public class FundAllotment implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="fundallotment_id")
	private long fundallotmentId;
	
	@Column(name="requirement_id")
	private long requirementId;
	
		
}
