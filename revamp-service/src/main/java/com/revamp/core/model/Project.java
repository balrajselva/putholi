package com.revamp.core.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.revamp.core.lookup.PuthuyirLookUp;

import lombok.Data;
import lombok.EqualsAndHashCode;
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
public class Project extends AuditableEntity {

	private static final long serialVersionUID = -5416628745442805358L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "project_id", nullable = false)
	private long projectId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "school_id", nullable = false)
	@JsonIgnore
	private School school;

	@Column(name = "estimated_amount")
	private int estimate;

	@ElementCollection
	private List<String> comments = new ArrayList<String>();

	@Column(name = "collected_amount")
	private int collectedAmount;

	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private PuthuyirLookUp status;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "project", cascade = CascadeType.ALL)
	private List<Requirement> requirements;

}
