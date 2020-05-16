package com.revamp.core.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.SchoolImage;

@Repository
public interface SchoolImageRepository extends CrudRepository<SchoolImage, Long> {

}
