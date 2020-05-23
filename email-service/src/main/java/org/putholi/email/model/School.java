package org.putholi.email.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Entity
@Table(name = "school")
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class School implements java.io.Serializable {

	private static final long serialVersionUID = 8607633702511344481L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "school_id", nullable = false)
	private long schoolId;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "school_info_id")
	private SchoolInfo schoolInfo;


	}
