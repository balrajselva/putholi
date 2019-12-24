package com.revamp.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.web.util.SchoolSerializer;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "school")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class School extends AuditableEntity implements java.io.Serializable {

	private static final long serialVersionUID = 8607633702511344481L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "school_id", nullable = false)
	private long schoolId;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "school_info_id")
	private SchoolInfo schoolInfo;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "contacts_id")
	private Contacts contacts;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "id")
	private Address address;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "school")
	private Set<Project> projects;

	@Column(name = "date_created")
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreated;

	@Column(name = "school_status")
	@JsonProperty("schoolStatus")
	@Enumerated(EnumType.STRING)
	private PuthuyirLookUp schoolStatus;

	@JsonProperty("proofOfId")
	@Transient
	private ProofOfId proofOfId;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "userid")
	private User user;

	@Transient
	private List<Requirement> requirements;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "school", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<SchoolImage> schoolImages;

	@PrePersist
	protected void onCreate() {
		dateCreated = new Date();
	}

	@Override
	public String toString() {
		return "School[schoolId="+schoolId+",schoolInfo="+schoolInfo+",contacts="+contacts+",address="+address+",projects="+projects
				+",dateCreated="+dateCreated+",schoolStatus="+schoolStatus+",proofOfId="+proofOfId+",user="+user+",requirements="
				+requirements+",schoolImages="+schoolImages;
	}
}
