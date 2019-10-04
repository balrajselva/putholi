package com.revamp.core.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.ProjectRepository;
import com.revamp.core.model.Project;

@Service
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Transactional
	public long saveOrUpdate(Project project) {
		if(project.getSchool() == null) {
			Optional<Project> projectBeforeUpdate =  projectRepository.findById(project.getProjectId());
			if (projectBeforeUpdate.isPresent()) {				
				projectBeforeUpdate.get().setEstimate(project.getEstimate());
				projectBeforeUpdate.get().setStatus(project.getStatus());
				projectBeforeUpdate.get().setCollectedAmount(project.getCollectedAmount());
				project = projectBeforeUpdate.get();
			}
		}
		return projectRepository.save(project).getProjectId();
	}

	public Optional<Project> get(long id) {
		return projectRepository.findById(id);
	}

}
