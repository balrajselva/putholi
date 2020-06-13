package org.putholi.core.service;

import org.putholi.core.dao.SchoolImageRepository;
import org.putholi.core.model.SchoolImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
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
