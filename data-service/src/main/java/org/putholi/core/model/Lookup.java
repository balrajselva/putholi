package org.putholi.core.model;

import lombok.*;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Entity
@Table(name = "lookup")
@Proxy(lazy = false)
@Getter (AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
@ToString
@Data
public class Lookup implements java.io.Serializable{

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "lookup_id")
	@Getter(AccessLevel.NONE)
	@Setter(AccessLevel.NONE)
	private Long lookup_id;
	
	@Column(name = "key_field")
	private String key_field;

	@Column(name = "key_value")
	private String key_value;

	@Column(name = "parent_field")
	private String parent_field;

	@Column(name = "parent_key")
	private String parent_key;

	
}
