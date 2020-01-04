package com.revamp.core.model;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "schoolimage")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class SchoolImage extends AuditableEntity implements java.io.Serializable {

	private static final long serialVersionUID = -2136842348977561820L;
	
	public SchoolImage() {}
	
	public SchoolImage(String filePath, byte[] image, String comments) {
		this.filePath = filePath;
		this.image = image;
		this.comments = comments;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	private long imageId;

	@Column(name = "image",nullable = false)
	@Lob
	@JsonIgnore
	private byte[] image;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "school_id", nullable = false)
	private School school;
	
	@Column(name = "date_created")
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreated;

	@PrePersist
	protected void onCreate() {
		dateCreated = new Date();
	}

	@Column(name = "comments")
	String comments;
	
	@Column(name = "filepath")
	private String filePath;
	
	
}
