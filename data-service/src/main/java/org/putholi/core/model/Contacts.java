package org.putholi.core.model;

import lombok.Data;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

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
	private String primaryConName;

	@Column(name = "pri_num")
	private String primaryConNum;

	@Column(name = "pri_email")
	private String primaryConMail;

	@Column(name = "sec_name")
	private String secondaryConName;

	@Column(name = "sec_num")
	private String secondaryConNum;

	@Column(name = "sec_email")
	private String secondaryConMail;

	
}
