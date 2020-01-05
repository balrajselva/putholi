package com.revamp.core.service;

import java.util.List;

import com.revamp.core.model.Lookup;

public interface LookupService {

	
	List<Lookup> lookup(String field);

	List<Lookup> lookupByParent(String parentField,
			String parentKey);


	Lookup save(Lookup lookup);

	List<Lookup> getAll();
}
