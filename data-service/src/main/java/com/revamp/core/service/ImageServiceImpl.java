package com.revamp.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.SchoolImageRepository;
import com.revamp.core.model.SchoolImage;

@Service
@Transactional(readOnly = true)
public class ImageServiceImpl implements ImageService {

	@Autowired
	private SchoolImageRepository schoolImageRepository;

	@Transactional
	public long save(SchoolImage image) {
		return schoolImageRepository.save(image).getImageId();
	}

	public SchoolImage get(long id) {
		return schoolImageRepository.findById(id).orElse(null);
	}

}
