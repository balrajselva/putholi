package org.putholi.data.core.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "deo_info")
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

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name="deo_file_id")
    @JsonIgnore
    private Set<DEOfile> deoFile;
}
