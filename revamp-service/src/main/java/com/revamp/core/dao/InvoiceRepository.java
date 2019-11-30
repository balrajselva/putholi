package com.revamp.core.dao;

import com.revamp.core.model.Invoice;
import org.springframework.data.repository.CrudRepository;

public interface InvoiceRepository extends CrudRepository<Invoice, Long> {

	Invoice findByName(String name);
	
}
