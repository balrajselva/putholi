package com.revamp.core.service;

import java.util.List;
import java.util.Optional;

import com.revamp.core.model.Project;

public interface ProjectService {

	long saveOrUpdate(Project project);

	Optional<Project> get(long id);
	
	List<Project> findBySchoolId(long id);
	
}
