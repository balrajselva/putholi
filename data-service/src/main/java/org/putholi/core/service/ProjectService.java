package org.putholi.core.service;

import org.putholi.core.lookup.PuthuyirLookUp;
import org.putholi.core.model.Project;

import java.util.List;
import java.util.Optional;

public interface ProjectService {

	long saveOrUpdate(Project project);

	long saveOrUpdate(Long projectId, Integer estimate, PuthuyirLookUp status, Integer collectedAmount);

	Optional<Project> get(long id);
	
	List<Project> findBySchoolId(long id);

    void updateProjectStatus(long projectId,String status);

	void updateReceiptComments(long projectId,String comment);
}
