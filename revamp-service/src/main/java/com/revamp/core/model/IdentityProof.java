package com.revamp.core.model;

import java.math.BigInteger;

import javax.persistence.*;

import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "identity_proof")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class IdentityProof extends AuditableEntity implements java.io.Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userid", nullable = false)
	private long userid;
	
	@Column(name="identity_proof")
	private BigInteger identityProof;

	@OneToOne
	@PrimaryKeyJoinColumn
	private User user;
}
