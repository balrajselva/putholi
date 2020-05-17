package org.putholi.data.core.service;

import java.util.List;
import java.util.Optional;

import org.putholi.data.core.lookup.PuthuyirLookUp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.putholi.data.core.dao.ProjectRepository;
import org.putholi.data.core.model.Project;

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

	@Transactional
	public long saveOrUpdate(Long projectId,Integer estimate, PuthuyirLookUp status, Integer collectedAmount) {
		Optional<Project> projectBeforeUpdate =  projectRepository.findById(projectId);
		Project project = new Project();
		if (projectBeforeUpdate.isPresent()) {
			projectBeforeUpdate.get().setEstimate(estimate);
			projectBeforeUpdate.get().setStatus(status);
			projectBeforeUpdate.get().setCollectedAmount(collectedAmount);
			project = projectBeforeUpdate.get();
		}
		return projectRepository.save(project).getProjectId();
	}

	public Optional<Project> get(long id) {
		return projectRepository.findById(id);
	}

	@Override
	public List<Project> findBySchoolId(long id) {
		return projectRepository.findBySchoolId(id);
	}

}
