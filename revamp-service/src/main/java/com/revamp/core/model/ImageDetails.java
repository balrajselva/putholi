package com.revamp.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "imagedetails")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Getter
@Setter
public class ImageDetails extends AuditableEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Column(name = "filepath")
	private String filePath;
	
	private String module;
	
	@Column(name = "moduleid")
	private long moduleId;
}
