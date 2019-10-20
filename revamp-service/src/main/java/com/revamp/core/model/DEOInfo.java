package com.revamp.core.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigInteger;
import java.sql.Blob;
import java.util.Set;

@Entity
@Table(name = "DEO_info")
@EntityListeners(AuditingEntityListener.class)
@Proxy(lazy = false)
@Getter
@Setter
public class DEOInfo extends AuditableEntity implements java.io.Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deo_info_Id", nullable = false)
    private long deoInfoId;

    @Column(name="school_id")
    private long school_id;

    @Column(name="project_id")
    private long project_id;

    @Column(name="status")
    private String status;

    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonIgnore
    private DEOfile deoFile;
}
