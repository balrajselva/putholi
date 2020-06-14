package org.putholi.core.dao;

import org.putholi.core.model.SchoolImage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolImageRepository extends CrudRepository<SchoolImage, Long> {

}
