package org.putholi.data.core.dao;

import org.putholi.data.core.model.SchoolImage;

public interface ImageDAO {

	long save(SchoolImage image);

	SchoolImage get(long id);
	
}
