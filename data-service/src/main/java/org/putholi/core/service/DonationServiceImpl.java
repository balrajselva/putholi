package org.putholi.core.service;

import org.putholi.core.converter.TrackDonationConverter;
import org.putholi.core.dao.DonationRepository;
import org.putholi.core.dao.ProjectRepository;
import org.putholi.core.dao.UserRepository;
import org.putholi.core.dto.TrackDonationDTO;
import org.putholi.core.model.Donation;
import org.putholi.core.model.Project;
import org.putholi.core.payload.DonationPayLoad;
import org.putholi.core.payload.TrackDonationResponsePayLoad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = false)
public class DonationServiceImpl implements DonationService {
	@Value("${image.path}")
	private String imgPath;

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
		return converter.convert(list,imgPath);
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
