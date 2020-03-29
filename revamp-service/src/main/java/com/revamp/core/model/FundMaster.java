package com.revamp.core.model;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "fund_master")
@EntityListeners(AuditingEntityListener.class)
@Data
public class FundMaster extends AuditableEntity implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="fund_id")
    private long fundId;

    @Column(name="expense_category")
    private String expenseCategory;

    @Column(name="project_id")
    private long projectId;

    @Column(name="school_id")
    private long schoolId;

    @Column(name="requirement_id")
    private long requirementId;

    @Column(name="invoice_id")
    private long invoiceId;

    @Column(name="allotted_amount")
    private Integer allottedAmount;

    @Column(name="fund_status")
    private String fundStatus;

    @Column(name="invoice_amount")
    private Integer invoiceAmount;

    @Column(name="order_id")
    private String orderId;

    @Column(name="paid_to_vendor_id")
    private Long paidToVendorId;

    @Column(name="paid_to_user_id")
    private Long paidToUserId;

    @Column(name="comments")
    private String comments;

    @Column(name="initiated_by")
    private Long initiatedBy;

    @Column(name="reviewed_by")
    private Long reviewedBy;

    @Column(name="approved_by")
    private Long approvedBy;

    @Column(name = "modified_date",nullable = true)
    private Date modifiedDate;

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
}