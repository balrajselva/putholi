package org.putholi.data.core.service;

import org.putholi.data.core.model.SchoolImage;

public interface ImageService {

	long save(SchoolImage image);

	SchoolImage get(long id);
	
}
