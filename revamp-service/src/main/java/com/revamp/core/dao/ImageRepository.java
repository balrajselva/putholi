package com.revamp.core.dao;

import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.model.PreImage;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ImageRepository extends CrudRepository<PreImage, Long> {

}
