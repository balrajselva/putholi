package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "invoiceimage")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class InvoiceImage extends AuditableEntity {

    private static final long serialVersionUID = -2136842348977561820L;

    public InvoiceImage() {}

    public InvoiceImage(String filePath, byte[] image, String comments) {
        this.filePath = filePath;
        this.image = image;
        this.comments = comments;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private long imageId;

    @Column(name = "image",length = 100000,nullable = false)
    private byte[] image;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "invoice_id", nullable = false)
    @JsonIgnore
    private Invoice invoice;

    @Column(name = "comments")
    String comments;

    @Column(name = "filepath")
    private String filePath;


}

