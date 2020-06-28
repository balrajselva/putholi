package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;
import org.putholi.core.lookup.PuthuyirLookUp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "project")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(ignoreUnknown = true)
@Proxy(lazy = false)
@Getter
@Setter
public class Project extends AuditableEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "project_id", nullable = false)
	private Long projectId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "school_id", nullable = false)
	@JsonIgnore
	private School school;

	@Column(name = "estimated_amount")
	private Integer estimate;

	private String adminComments;

	private String approverComments;

	private String reviewerComments;

	@Column(name = "collected_amount")
	private Integer collectedAmount;

	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private PuthuyirLookUp status;

	@Column(name = "IsActiveProject")
	private String IsActiveProject;

	@Column(name ="VolunteerId")
	private Long volunteerId;

	@Column(name = "receiptComments")
	private String receiptComments;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "project", cascade = CascadeType.ALL)
	private List<Requirement> requirements;

}
