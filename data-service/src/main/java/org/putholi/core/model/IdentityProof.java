package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "identity_proof")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Getter
@Setter
public class IdentityProof extends AuditableEntity{
	public IdentityProof() {}

	public IdentityProof(String filePath) {
		this.filePath = filePath;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "identity_proof_id", nullable = false)
	private long identity_proof_id;

	@Column(name = "filepath")
	private String filePath;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
	private User user;
}
