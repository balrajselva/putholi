package com.revamp.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

import lombok.Data;

@Entity
@Table(name = "role")
@Proxy(lazy = false)
@Data
public class Role implements java.io.Serializable {

	private static final long serialVersionUID = 2811455068434644746L;

	@Id
	@Column(name = "roleid")
	private String roleId;

	@Column(name = "rolename")
	private String roleName;

	@Column(name = "accesslevel")
	private String accessLevel;

	
}
