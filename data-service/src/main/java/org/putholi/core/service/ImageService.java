package org.putholi.core.service;

import org.putholi.core.model.SchoolImage;

public interface ImageService {

	long save(SchoolImage image);

	SchoolImage get(long id);
	
}
