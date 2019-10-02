package com.revamp.core.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.DonationRepository;
import com.revamp.core.dao.ProjectRepository;
import com.revamp.core.dao.UserRepository;
import com.revamp.core.model.Donation;
import com.revamp.core.model.Project;
import com.revamp.core.payload.DonationPayLoad;

@Service
@Transactional(readOnly = true)
public class DonationServiceImpl implements DonationService {

	@Autowired
	private DonationRepository donationRepository;

	
	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private UserRepository userRepository;

	@Transactional
	@Override
	public Donation donate(Donation donation) {
		this.donationRepository.save(donation);
		Optional<Project> project = this.projectRepository.findById(donation.getProject().getProjectId());
		if(project.isPresent()) {
			Project dbProject = project.get();
			this.setUpdatedProject(dbProject,donation);
			this.projectRepository.save(dbProject);
		}
		return donation;
	}
	
	private void setUpdatedProject(Project dbProject, Donation donation) {
		Project updProject = donation.getProject();
		updProject.setCollectedAmount(dbProject.getCollectedAmount()+donation.getAmount());
		if(updProject.getCollectedAmount() > dbProject.getCollectedAmount()  ) {
			dbProject.setCollectedAmount(updProject.getCollectedAmount());
		}
	}

	@Override
	public Donation get(long id) {
		return donationRepository.findById(id).orElse(null);
	}
	
	public Donation donate (DonationPayLoad donationPayLoad) {
		return null;
	}

}
