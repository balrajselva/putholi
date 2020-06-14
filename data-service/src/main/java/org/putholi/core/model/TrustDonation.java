package org.putholi.core.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "trust_donation")
@Data
public class TrustDonation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trust_donation_id", nullable = false)
    private long trustDonationId;

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

}
