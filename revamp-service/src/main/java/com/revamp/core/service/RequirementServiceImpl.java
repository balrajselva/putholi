package com.revamp.core.service;

import java.util.List;
import java.util.stream.Collectors;

import com.revamp.core.model.Donation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revamp.core.dao.RequirementRepository;
import com.revamp.core.model.Project;
import com.revamp.core.model.Requirement;
import org.springframework.transaction.annotation.Transactional;

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

	@Override
	@Transactional
	public void updateRequirements(Donation donation) {
		Project project = donation.getProject();
		List<Requirement> requirements = project.getRequirements();
		int remainingAmount = donation.getCollectedAmount();
		for(int i=1;i<=requirements.size();i++){
			Requirement requirement = getReq(requirements, i);
			assert requirement != null;
			if(requirement.getCollectedAmount() != 0){
				remainingAmount -= requirement.getCollectedAmount();
				int requiredAmount = requirement.getEstimate() - requirement.getCollectedAmount();
				if(requiredAmount == 0)
					continue;
				if(remainingAmount < requiredAmount){
					requirement.setCollectedAmount( requirement.getCollectedAmount() + remainingAmount);
					remainingAmount = 0;
				}
				else{
					requirement.setCollectedAmount( requirement.getCollectedAmount() + requiredAmount);
					remainingAmount = remainingAmount - requiredAmount;
				}
                requirementRepository.updateRequirementCollectedAmount(requirement.getRequirementId(), requirement.getCollectedAmount());
			}
			else if(requirement.getCollectedAmount() == 0 && remainingAmount < requirement.getEstimate()) {
				requirement.setCollectedAmount(remainingAmount);
				remainingAmount -= requirement.getCollectedAmount();
				requirementRepository.updateRequirementCollectedAmount(requirement.getRequirementId(), requirement.getCollectedAmount());
			}
			else if(requirement.getCollectedAmount() == 0 && remainingAmount > requirement.getEstimate()){
				requirement.setCollectedAmount(requirement.getEstimate());
				remainingAmount -= requirement.getEstimate();
				requirementRepository.updateRequirementCollectedAmount(requirement.getRequirementId(), requirement.getCollectedAmount());
			}
			if(remainingAmount <= 0)
				break;
		}
	}

	private static Requirement getReq(List<Requirement> requirements,int finalI1) {
		for(Requirement requirement1: requirements){
			if(Integer.valueOf(requirement1.getPriority()).equals(finalI1))
				return requirement1;
		}
		return null;
	}

}
