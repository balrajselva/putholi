package org.putholi.core.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "deo_info")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@ToString
public class DEOInfo extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deo_info_id", nullable = false)
    private long deoInfoId;

    @Column(name="school_id")
    private long school_id;

    @Column(name="project_id")
    private long project_id;

    @Column(name="status")
    private String status;

    @OneToMany(fetch = FetchType.EAGER,  mappedBy = "deoInfo" ,cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<DEOInfoImage> deOfiles;

    public DEOInfo(){ }

}
