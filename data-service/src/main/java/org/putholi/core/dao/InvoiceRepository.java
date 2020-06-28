package org.putholi.core.dao;

import org.putholi.core.model.Invoice;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Long> {
    @Query("SELECT u FROM Invoice u where u.school.schoolId=:schoolId")
    List<Invoice> findBySchoolId(@Param("schoolId") long schoolId);

    @Query("SELECT u FROM Invoice u where u.school.schoolId=:schoolId AND u.invoiceStatus='PAYMENT_COMPLETED'")
    List<Invoice> findPaidInvoiceBySchoolId(@Param("schoolId") long schoolId);

    @Query("SELECT u FROM Invoice u where u.id=:invoiceId")
    Invoice findByInvoiceId(@Param("invoiceId")long invoiceId);

    @Modifying
    @Query("UPDATE Invoice s set s.invoiceStatus = :status where s.id = :invoiceId")
    void updateStatus(@Param("invoiceId")Long invoiceId,@Param("status") String status);

    @Modifying
    @Query("UPDATE Invoice s set s.admin = :userId where s.id = :invoiceId")
    void updateAdmin(@Param("invoiceId")Long invoiceId,@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE Invoice s set s.adminComments = :adminComments where s.id = :invoiceId")
    void updateAdminComments(@Param("invoiceId")long invoiceId,@Param("adminComments") String adminComments);

    @Modifying
    @Query("UPDATE Invoice s set s.approverComments = :approverComments where s.id = :invoiceId")
    void updateApproverComments(@Param("invoiceId")long invoiceId,@Param("approverComments") String approverComments);

    @Modifying
    @Query("UPDATE Invoice s set s.reviewerComments = :reviewerComments where s.id = :invoiceId")
    void updateReviewerComments(@Param("invoiceId")long invoiceId,@Param("reviewerComments") String reviewerComments);
    
    List<Invoice> findByInvoiceStatus(@Param("invoiceStatus")String invoiceStatus);

    @Query("SELECT u FROM Invoice u where u.requirement.requirementId=:requirementId")
    List<Invoice> findByRequirementId(@Param("requirementId")long requirementId);
}

