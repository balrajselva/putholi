package org.putholi.core.dao;

import org.putholi.core.model.FundDisbursement;
import org.springframework.data.repository.CrudRepository;

public interface FundDisbursementRepository extends CrudRepository<FundDisbursement, Long> {
//    @Modifying
//    @Query("UPDATE FundDisbursement s set s.adminComments = :status,s.comment= :comment, modifiedDate = now() where s.projectId = :id")
//    void updateStatus(@Param("id") long id, @Param("status") PuthuyirLookUp status, @Param("commentList") String commentList);
}
