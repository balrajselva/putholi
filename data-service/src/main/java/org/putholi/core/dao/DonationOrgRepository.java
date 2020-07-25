package org.putholi.core.dao;

import org.putholi.core.model.DonationOrg;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface DonationOrgRepository extends CrudRepository<DonationOrg,Long> {
    @Query("SELECT u FROM DonationOrg u WHERE u.orgEmail = :orgEmail and u.password = :password")
    DonationOrg findByEmailAndPassword(@Param("orgEmail")String orgEmail, @Param("password")String password);

    @Query("SELECT u FROM DonationOrg u WHERE u.orgEmail = :orgEmail")
    DonationOrg findByEmail(@Param("orgEmail")String orgEmail);
}
