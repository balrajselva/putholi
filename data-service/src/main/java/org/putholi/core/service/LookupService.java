package org.putholi.core.service;

import org.putholi.core.model.Lookup;

import java.util.List;

public interface LookupService {

	
	List<Lookup> lookup(String field);

	List<Lookup> lookupByParent(String parentField,
			String parentKey);


	Lookup save(Lookup lookup);

	List<Lookup> getAll();
}
