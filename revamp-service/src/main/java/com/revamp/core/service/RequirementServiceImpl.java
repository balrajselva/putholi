package com.revamp.core.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revamp.core.dao.RequirementRepository;
import com.revamp.core.model.Project;
import com.revamp.core.model.Requirement;

@Service
public class RequirementServiceImpl implements RequirementService {

	@Autowired
	private ProjectService projectService;

	@Autowired
	private RequirementRepository requirementRepository;

	@Override
	public List<Requirement> findBySchoolId(long id) {
		List<Project> projects = projectService.findBySchoolId(id);
		List<Long> projectIds = projects.stream().map(Project::getProjectId).collect(Collectors.toList());
		return requirementRepository.findByProjectIds(projectIds);
	}

}
