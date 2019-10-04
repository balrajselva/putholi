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

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "contacts")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Data 
public class Contacts extends AuditableEntity implements java.io.Serializable {

	private static final long serialVersionUID = 1769915147037089195L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "contacts_id", nullable = false)
	private long contactsId;

	@Column(name = "pri_name")
	private String priName;

	@Column(name = "pri_num")
	private String priNum;

	@Column(name = "pri_email")
	private String priEmail;

	@Column(name = "sec_name")
	private String secName;

	@Column(name = "sec_num")
	private String secNum;

	@Column(name = "sec_email")
	private String secEmail;

	
}
