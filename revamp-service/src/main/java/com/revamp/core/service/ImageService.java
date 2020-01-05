package com.revamp.core.service;

import com.revamp.core.model.SchoolImage;

public interface ImageService {

	long save(SchoolImage image);

	SchoolImage get(long id);
	
}
