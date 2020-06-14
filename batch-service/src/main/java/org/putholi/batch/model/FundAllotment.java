package org.putholi.batch.model;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

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
