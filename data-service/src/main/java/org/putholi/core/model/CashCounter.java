package org.putholi.core.model;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "cash_counter")
@EntityListeners(AuditingEntityListener.class)
@Data
public class CashCounter {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cash_counter_id")
    private long id;

    @Column(name = "total_inflow_cash_donor")
    private BigInteger totalInflowCashDonor;

    @Column(name = "total_inflow_cash_org")
    private BigInteger totalInflowCashOrg;

    @Column(name = "total_inflow_cash_trust")
    private BigInteger totalInflowCashTrust;

    @Column(name = "total_outflow_cash")
    private BigInteger totalOutflowCash;

    @Column(name = "total_donor_balance")
    private BigInteger totalDonorBalance;

    @Column(name = "total_trust_balance")
    private BigInteger totalTrustBalance;

    @Column(name = "total_available_balance")
    private BigInteger totalAvailableBalance;

    @Column(name = "total_adjusted_amount")
    private BigInteger totalAdjustedAmount;
}
