package com.revamp.core.service;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.ImageDetailsRepository;
import com.revamp.core.model.ImageDetails;

@Service
@Transactional
public class ImageServiceImpl implements ImageService {

	@Autowired
	private ImageDetailsRepository repo;
	
	@Override
	public void save(List<ImageDetails> images) {
		repo.saveAll(images);
	}

	@Override
	public List<ImageDetails> get(String module, Collection<Long> moduleId) {
		return repo.findByModuleAndModuleIdIn(module, moduleId);
	}



}
