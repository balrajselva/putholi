package com.revamp.core.service;

import java.util.Collection;
import java.util.List;

import com.revamp.core.model.ImageDetails;

public interface ImageService {

	void save(List<ImageDetails> images);

	List<ImageDetails> get(String module, Collection<Long> moduleId);
	
}
