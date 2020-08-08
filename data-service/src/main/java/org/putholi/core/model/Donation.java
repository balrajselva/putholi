package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Proxy;
import org.putholi.core.lookup.PuthuyirLookUp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "donation")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(ignoreUnknown = true)
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class Donation extends AuditableEntity implements java.io.Serializable {

	private static final long serialVersionUID = -1748436992625970292L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "donation_id", nullable = false)
	private long donationId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "project_id")
	private Project project;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "donation_userid")
	private DonationUser donationUser;

	@ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.MERGE)
	@JoinColumn(name = "donation_org_id")
	private DonationOrg donationOrg;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "school_id", nullable = false)
	private School school;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "payment_mode")
	private String paymentMode;

	@Column(name = "order_id")
	private String orderId;

	@Column(name = "amount")
	private int amount;

	@Column(name = "payment_status")
	private String paymentStatus = "PENDING";

	@Column(name = "createdate")
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	private Date createDate;

	@Column(name = "tracking_id")
	private String tracking_id;

	@Column(name = "estimated_amount")
	private Integer estimate;

	@Column(name = "collected_amount")
	private Integer collectedAmount;

	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private PuthuyirLookUp status;

	@Column(name = "isSchoolReadyForAllotment")
	private String isSchoolReadyForAllotment;

	@Column(name = "adjustableAmount")
	private Integer adjustableAmount;
	
}
