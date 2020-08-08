package org.putholi.core.service;

import org.putholi.core.dao.ProjectRepository;
import org.putholi.core.dao.RequirementRepository;
import org.putholi.core.lookup.PuthuyirLookUp;
import org.putholi.core.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = false)
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private RequirementRepository requirementRepository;

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
	public long saveOrUpdate(Long projectId, Integer estimate, PuthuyirLookUp status, Integer collectedAmount) {
		Optional<Project> projectBeforeUpdate =  projectRepository.findById(projectId);
		Project project = new Project();
		if (projectBeforeUpdate.isPresent()) {
			projectBeforeUpdate.get().setEstimate(estimate);
//			projectBeforeUpdate.get().setStatus(status);
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

	@Override
	public void updateProjectStatus(long projectId, String status) {
		projectRepository.updateProjectStatus(projectId,PuthuyirLookUp.valueOf(status),null);
		if(status=="PROJECT_CLOSED"){
			requirementRepository.updateRequirementStatus(projectId,status);
		}
	}

	@Override
	public void updateReceiptComments(long projectId, String comment) {
		projectRepository.updateReceiptComments(projectId,comment);
	}
}
