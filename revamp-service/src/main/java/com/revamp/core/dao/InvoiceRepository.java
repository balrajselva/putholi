package com.revamp.core.dao;

import com.revamp.core.model.Invoice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Long> {
    @Query("SELECT u FROM Invoice u where u.schoolId=:schoolId")
    List<Invoice> findBySchoolId(long schoolId);
}

