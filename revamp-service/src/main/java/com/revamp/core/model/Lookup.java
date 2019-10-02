package com.revamp.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "lookup")
@Proxy(lazy = false)
@Data public class Lookup {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "lookup_id")
	
	@Getter(AccessLevel.NONE) @Setter(AccessLevel.NONE) private Long lookup_id;
	
	
	@Column(name = "field")
    private String field;

	
	@Column(name = "key")
	private String key;

	@Column(name = "value")
	private String value;

	@Column(name = "parent_field")
	private String parentField;

	@Column(name = "parent_key")
	private String parentKey;

	
}
