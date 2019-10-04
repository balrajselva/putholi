package com.revamp.core.dao;

import com.revamp.core.model.SchoolImage;

public interface ImageDAO {

	long save(SchoolImage image);

	SchoolImage get(long id);
	
}
