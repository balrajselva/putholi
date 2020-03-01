package com.revamp.core.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.converter.TrackDonationConverter;
import com.revamp.core.dao.DonationRepository;
import com.revamp.core.dao.ProjectRepository;
import com.revamp.core.dao.UserRepository;
import com.revamp.core.dto.TrackDonationDTO;
import com.revamp.core.model.Donation;
import com.revamp.core.model.Project;
import com.revamp.core.payload.DonationPayLoad;
import com.revamp.core.payload.TrackDonationResponsePayLoad;

@Service
@Transactional(readOnly = true)
public class DonationServiceImpl implements DonationService {

	private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
	@Autowired
	private DonationRepository donationRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private UserRepository userRepository;

	@Transactional
	@Override
	public Donation donate(Donation donation) {
//		donation.setTracking_id(this.getTrackingId()+"-"+donation.getDonor().getUserid());
		this.donationRepository.save(donation);
		Optional<Project> project = this.projectRepository.findById(donation.getProject().getProjectId());
		if(project.isPresent()) {
			Project dbProject = project.get();
			this.setUpdatedProject(dbProject,donation);
			this.projectRepository.save(dbProject);
		}
		return donation;
	}
	
	public TrackDonationResponsePayLoad findMyDonation(String trackingId) {
		List<TrackDonationDTO> list = donationRepository.findByTrackingId(trackingId); 
		TrackDonationConverter converter = new TrackDonationConverter();
		return converter.convert(list);
	}
	
	private String getTrackingId() {
		StringBuilder builder = new StringBuilder();
		int count=8;
		while (count-- != 0) {
		int character = (int)(Math.random()*ALPHA_NUMERIC_STRING.length());
		builder.append(ALPHA_NUMERIC_STRING.charAt(character));
		}
		return builder.toString();
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
	
	@Transactional
	public Donation savePaymentUser(Donation donation) {
		return donationRepository.save(donation);
		
	}

	@Override
	public Donation getByOrderId(String orderId) {
		return donationRepository.findByOrderId(orderId);
	}


	public Donation donate (DonationPayLoad donationPayLoad) {
		return null;
	}

}
