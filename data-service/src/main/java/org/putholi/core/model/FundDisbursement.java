package org.putholi.core.model;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @author Puthyir Dev Team
 *
 */
@Entity
@Table(name = "fund_disbursement")
@EntityListeners(AuditingEntityListener.class)
@Data
public class FundDisbursement extends AuditableEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="fund_disbursement_id")
	private long funddisbursementId;

	@Column(name="invoice_id")
	private long invoiceId;

	@Column(name="invoice_amount")
	private Integer invoiceAmount;

	@Column(name="order_id")
	private String orderId;

	@Column(name="paid_to_vendor_id")
	private Long paidToVendorId;

	@Column(name="paid_to_user_id")
	private Long paidToUserId;

	@Column(name="admin_comments")
	private String adminComments;

	@Column(name="reviewer_comments")
	private String reviewerComments;

	@Column(name="approver_comments")
	private String approverComments;

	@Column(name="initiated_by")
	private Long initiatedBy;

	@Column(name="reviewed_by")
	private Long reviewedBy;

	@Column(name="approved_by")
	private Long approvedBy;

	@Column(name = "disbursement_date", nullable = true)
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	private Date disbursementDate;

	@Column(name="bank_name")
	private String bankName;

	@Column(name="ifsc_code")
	private String ifscCode;

	@Column(name="account_num")
	private String accountNumber;

	@Column(name="payment_mode")
	private String paymentMode;

	@Column(name="amount_paid")
	private Integer amountPaid;
}
