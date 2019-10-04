package com.revamp.core.service;

import java.util.List;

import com.revamp.core.model.Lookup;
import com.revamp.core.model.Role;

public interface LookupService {

	
	List<Lookup> lookup(String field);

	List<Lookup> lookupByParent(String field, String parentField,
			String parentKey);

}
