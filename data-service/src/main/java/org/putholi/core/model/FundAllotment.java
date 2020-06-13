package org.putholi.core.model;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "fund_allotment")
@EntityListeners(AuditingEntityListener.class)
@Data
public class FundAllotment extends AuditableEntity implements Serializable {

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

    @Column(name="allotted_amount")
    private Integer allottedAmount;

    @Column(name="fund_status")
    private String fundStatus;

    @Column(name = "modified_date",nullable = true)
    private Date modifiedDate;

    @Column(name="total_amount_paid")
    private Integer totalAmountPaid;
}