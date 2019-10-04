package com.revamp.core.dao;

import org.springframework.data.repository.CrudRepository;

import com.revamp.core.model.Invoice;

public interface InvoiceRepository extends CrudRepository<Invoice, Long> {

	public Invoice findByName(String name);
	
}
