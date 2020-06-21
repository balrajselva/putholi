package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@Table(name = "quotationimage")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class QuotationImage extends AuditableEntity {

    private static final long serialVersionUID = -2136842348977561820L;

    public QuotationImage() {}

    public QuotationImage(String filePath, byte[] image, String comments) {
        this.filePath = filePath;
        this.image = image;
        this.comments = comments;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private long imageId;

    @Transient
    @Nullable
    private byte[] image;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quotation_id", nullable = false)
    @JsonIgnore
    private Quotation quotation;

    @Column(name = "comments")
    String comments;

    @Column(name = "filepath")
    private String filePath;


}
