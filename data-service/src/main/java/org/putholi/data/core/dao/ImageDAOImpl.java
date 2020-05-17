package org.putholi.data.core.dao;

import org.hibernate.SessionFactory;
import org.putholi.data.core.model.SchoolImage;
import org.springframework.beans.factory.annotation.Autowired;

//@Repository
public class ImageDAOImpl implements ImageDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public long save(SchoolImage image) {
		sessionFactory.getCurrentSession().save(image);
		return image.getImageId();
	}

	public SchoolImage get(long id) {
		return sessionFactory.getCurrentSession().get(SchoolImage.class, id);
	}
}
