package org.putholi.core.dao;

import org.putholi.core.model.Invoice;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Long> {
    @Query("SELECT u FROM Invoice u where u.school.schoolId=:schoolId")
    List<Invoice> findBySchoolId(long schoolId);

    @Query("SELECT u FROM Invoice u where u.id=:invoiceId")
    Invoice findByInvoiceId(long invoiceId);

    @Modifying
    @Query("UPDATE Invoice s set s.invoiceStatus = :status where s.id = :invoiceId")
    void updateStatus(Long invoiceId, String status);

    @Modifying
    @Query("UPDATE Invoice s set s.admin = :userId where s.id = :invoiceId")
    void updateAdmin(Long invoiceId, Long userId);

    @Modifying
    @Query("UPDATE Invoice s set s.adminComments = :adminComments where s.id = :invoiceId")
    void updateAdminComments(long invoiceId, String adminComments);

    @Modifying
    @Query("UPDATE Invoice s set s.approverComments = :approverComments where s.id = :invoiceId")
    void updateApproverComments(long invoiceId, String approverComments);

    @Modifying
    @Query("UPDATE Invoice s set s.reviewerComments = :reviewerComments where s.id = :invoiceId")
    void updateReviewerComments(long invoiceId, String reviewerComments);


}

