package org.putholi.data.core.dao;

import org.putholi.data.core.model.SchoolImage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolImageRepository extends CrudRepository<SchoolImage, Long> {

}
