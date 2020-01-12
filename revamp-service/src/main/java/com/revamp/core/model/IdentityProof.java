package com.revamp.core.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "identity_proof")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Getter
@Setter
public class IdentityProof extends AuditableEntity implements java.io.Serializable{
	public IdentityProof() {}

	public IdentityProof(String filePath, byte[] image, String comments) {
		this.filePath = filePath;
		this.image = image;
		this.comments = comments;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "identity_proof_id", nullable = false)
	private long identity_proof_id;
	
	@Column(name="image")
	@JsonIgnore
	private byte[] image;

	@Column(name = "filepath")
	private String filePath;

	@Column(name = "comments")
	@ColumnDefault("No comments")
	String comments;

	@OneToOne
	@PrimaryKeyJoinColumn
	@JsonBackReference
	private User user;
}
