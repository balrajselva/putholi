package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name = "school")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@ToString
public class School extends AuditableEntity {

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
	@JoinColumn(name = "address_id")
	private Address address;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "school")
	private Set<Project> projects;

	@Column(name = "school_status")
	@JsonProperty("schoolStatus")
	private String schoolStatus;

	@Column(name = "enable_donation")
	@JsonProperty("enable_donation")
	private String enableDonation;

	@JsonProperty("proofOfId")
	@Transient
	private ProofOfId proofOfId;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name ="volunteer_id", nullable = true)
	private Long volunteerId;
	
	@OneToMany(fetch = FetchType.EAGER,  mappedBy = "school" ,cascade = CascadeType.ALL)
	@Fetch(value = FetchMode.SUBSELECT)
	private List<SchoolImage> schoolImages;
	
	
	@Transient
	private List<Requirement> requirements;

	public School(){

    }
	public School (String schoolId){
		this.schoolId=Long.parseLong(schoolId);
	}
}
