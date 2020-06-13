package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "schoolimage")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class SchoolImage extends AuditableEntity {

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

	@Column(name = "image",length = 10000,nullable = false)
	private byte[] image;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "school_id", nullable = false)
    @JsonIgnore
	private School school;

	@Column(name = "comments")
	String comments;
	
	@Column(name = "filepath")
	private String filePath;
	
	
}
