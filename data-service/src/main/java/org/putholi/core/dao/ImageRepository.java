package org.putholi.core.dao;

import org.putholi.core.model.PreImage;
import org.springframework.data.repository.CrudRepository;

public interface ImageRepository extends CrudRepository<PreImage, Long> {

}
