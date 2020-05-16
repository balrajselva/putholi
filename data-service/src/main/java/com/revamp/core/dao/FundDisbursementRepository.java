package com.revamp.core.dao;

import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.model.FundDisbursement;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface FundDisbursementRepository extends CrudRepository<FundDisbursement, Long> {
//    @Modifying
//    @Query("UPDATE FundDisbursement s set s.adminComments = :status,s.comment= :comment, modifiedDate = now() where s.projectId = :id")
//    void updateStatus(@Param("id") long id, @Param("status") PuthuyirLookUp status, @Param("commentList") String commentList);
}
