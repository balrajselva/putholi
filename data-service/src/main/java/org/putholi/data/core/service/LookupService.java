package org.putholi.data.core.service;

import java.util.List;

import org.putholi.data.core.model.Lookup;

public interface LookupService {

	
	List<Lookup> lookup(String field);

	List<Lookup> lookupByParent(String parentField,
			String parentKey);


	Lookup save(Lookup lookup);

	List<Lookup> getAll();
}
