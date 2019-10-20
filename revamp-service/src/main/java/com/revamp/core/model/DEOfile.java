package com.revamp.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "deo_file")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Data
public class DEOfile extends AuditableEntity implements java.io.Serializable{
    private static final long serialVersionUID = -2136842348977561820L;

    public DEOfile(){}

    public DEOfile(byte[] image) {
        this.image = image;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deo_file_id")
    private long deoFileId;

    @Column(name = "image",nullable = false)
    @Lob
    @JsonIgnore
    private byte[] image;

    @OneToOne(fetch = FetchType.EAGER)
    @PrimaryKeyJoinColumn
    private DEOInfo deoInfo;

    @Column(name = "date_created")
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    @PrePersist
    protected void onCreate() {
        dateCreate = new Date();
    }
}
