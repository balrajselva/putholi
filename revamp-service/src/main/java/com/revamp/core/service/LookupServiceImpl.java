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
	private LookupRepository lookupRepo;

	@Override
	public List<Lookup> lookup(String field) {
		return lookupRepo.lookup(field);
	}

	@Override
	public List<Lookup> lookupByParent( String parentField,
			String parentKey) {
		return lookupRepo.lookupByParent(parentField, parentKey);
	}

	@Override
	public Lookup save(Lookup lookup) {
		return lookupRepo.save(lookup);
	}

	@Override
	public List<Lookup> getAll() {
		return lookupRepo.getAll();
	}

}
