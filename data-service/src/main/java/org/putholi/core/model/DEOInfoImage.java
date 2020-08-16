package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@Table(name = "deo_file")
@Proxy(lazy = false)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class DEOInfoImage extends AuditableEntity{
    private static final long serialVersionUID = -2136842348977561820L;

    public DEOInfoImage(){}

    public DEOInfoImage(String filePath) {
        this.filePath = filePath;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deo_file_id")
    private long deoFileId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="deo_info_id", nullable=false)
    @JsonIgnore
    private DEOInfo deoInfo;

    @Transient
    @Nullable
    private byte[] image;

    @Column(name = "filepath")
    private String filePath;
}
