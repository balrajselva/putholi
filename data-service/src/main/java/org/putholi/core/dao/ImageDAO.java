package org.putholi.core.dao;

import org.putholi.core.model.SchoolImage;

public interface ImageDAO {

	long save(SchoolImage image);

	SchoolImage get(long id);
	
}
