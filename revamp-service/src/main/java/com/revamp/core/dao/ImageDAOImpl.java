package com.revamp.core.dao;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.SchoolImage;

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
