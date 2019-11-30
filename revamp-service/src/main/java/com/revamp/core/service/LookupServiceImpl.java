package com.revamp.core.service;

import com.revamp.core.dao.LookupRepository;
import com.revamp.core.model.Lookup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LookupServiceImpl implements LookupService {

	@Autowired
	private LookupRepository lookup;

	

	@Override
	public List<Lookup> lookup(String field) {
		return lookup.lookup(field);
	}

	@Override
	public List<Lookup> lookupByParent(String field, String parentField,
			String parentKey) {
		return lookup.lookupByParent(field, parentField, parentKey);
	}

}
