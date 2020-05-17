package org.putholi.data.core.service;

import java.util.List;
import java.util.Optional;

import org.putholi.data.core.lookup.PuthuyirLookUp;
import org.putholi.data.core.model.Project;

public interface ProjectService {

	long saveOrUpdate(Project project);

	long saveOrUpdate(Long projectId, Integer estimate, PuthuyirLookUp status, Integer collectedAmount);

	Optional<Project> get(long id);
	
	List<Project> findBySchoolId(long id);
	
}
