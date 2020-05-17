package org.putholi.data.core.service;

import org.putholi.data.core.dao.LookupRepository;
import org.putholi.data.core.model.Lookup;
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
