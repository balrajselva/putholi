package org.putholi.core.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Proxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "donation_org")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(ignoreUnknown = true)
@Proxy(lazy = false)
@Getter
@Setter
@ToString
public class DonationOrg extends AuditableEntity implements java.io.Serializable {
    private static final long serialVersionUID = -1748436992625970292L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_org_id")
    private long donationOrgId;

    @Column(name = "organization_name")
    private String orgName;

    @Column(name ="org_email")
    private String orgEmail;

    @Column(name = "organization_contact")
    private String orgContact;

    @Column(name = "organization_address")
    private String orgAddress;

    @Column(name = "organization_country")
    private String orgCountry;

    @Column(name = "organization_type")
    private String orgType;

    @Column(name = "entity_type")
    private String entityType;

    @Column(name = "organization_reg_num")
    private String orgRegNum;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "role")
    private String role;

    @Column(name = "branch_in_other_Country")
    private String branchInOtherCountries;

    @Column(name = "money_in_rupees")
    private String moneyInRupees;

    @Column(name="password")
    private String password;

}
