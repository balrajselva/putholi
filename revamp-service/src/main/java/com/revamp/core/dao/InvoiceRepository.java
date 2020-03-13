package com.revamp.core.dao;

import com.revamp.core.model.Invoice;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Long> {

	Invoice findByName(String name);
	
}
