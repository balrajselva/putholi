package com.revamp.core.dao;

import java.util.Collection;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.ImageDetails;

@Repository
public interface ImageDetailsRepository extends CrudRepository<ImageDetails, Long> {
    List<ImageDetails> findByModuleAndModuleIdIn(String module, Collection<Long> moduleId);
}
