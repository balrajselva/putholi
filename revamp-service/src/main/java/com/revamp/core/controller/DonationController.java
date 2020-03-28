package com.revamp.core.controller;

import java.security.SecureRandom;
import java.util.Date;
import java.util.stream.Collectors;

import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.model.*;
import com.revamp.core.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author PuthirDevTeam
 *
 */
@RestController
public class DonationController {

	@Autowired
	private DonationService donationService;
	
	@Autowired
	private DonationUserService donationUserService;

	@Autowired
	private ProjectService projectService;

	@Autowired
	private RequirementService requirementService;

	@Autowired
	private TrustDonationService trustDonationService;
	/**
	 * 
	 * @param donation
	 * @return
	 */
	@PutMapping("/donate")
	public ResponseEntity<Donation> save(@RequestBody Donation donation) {
		Date today = new Date();
		donation.setCreateDate(today);
		donation = donationService.donate(donation);
		System.out.println(donation);
		return ResponseEntity.ok().body(donation);
	}

	/**
	 * 
	 * @param donation Id
	 * @return donation
	 */
	@GetMapping("/donate/{id}")
	public ResponseEntity<Donation> getDonation(@PathVariable("id") long id) {
		return ResponseEntity.ok().body(donationService.get(id));
	}
	
	
	@PostMapping("/donate/save")
	public ResponseEntity<DonationUser> saveUser(@RequestBody DonationUser donation) {
		DonationUser donationResponse = donationUserService.save(donation);
		return ResponseEntity.ok().body(donationResponse);
	}
	
	/**
	 * 
	 * @param donation Id
	 * @return donation
	 */
	@PostMapping("/donate/findByEmailId")
	public String findEmail(@RequestBody DonationUser donation) {
		String status = "";
		
		DonationUser user=null;
		try {
			user = donationUserService.findByEmailAddress(donation.getEmailAddress());
			
		if(user == null) {
			status = "FAILURE";
		}
		else {
			status = "SUCCESS";
		}
		}catch(Exception e) {
				status = "SUCCESS";
		}
		
		return status;
	}
	
	/**
	 * 
	 * @param donation Id
	 * @return donation
	 */
	@PostMapping("/donate/findDonationUser")
	public ResponseEntity<DonationUser> findDonationUser(@RequestBody DonationUser donation) {
		
		DonationUser user = donationUserService.
				findByEmailAddressPassword(donation.getEmailAddress(),donation.getPassword());
		
		if(user == null) {
			DonationUser userDonation = new DonationUser();
			userDonation.setEmailAddress("email");
			
			 return new ResponseEntity<DonationUser>(userDonation,HttpStatus.OK);
		}
		
		return ResponseEntity.ok().body(user);
	}
	
	/**
	 * 
	 * @param donation Id
	 * @return donation
	 */
	@PostMapping("/donate/paymentDonation")
	public ResponseEntity<Donation> savePaymentUser(@RequestBody Donation donation) {
		String trackIdGenerator =  "PTHL"+ generateTrackNumber();
		donation.setTracking_id(trackIdGenerator);
		Donation responseDonation = donationService.savePaymentUser(donation);
		return ResponseEntity.ok().body(responseDonation);
	}

	@GetMapping("/donate/paymentDonation/{order_id}/{status}")
	public ResponseEntity<Donation> getPaymentUser(@PathVariable("order_id") String orderId,@PathVariable("status") String status) {
		if(status.equals("SUCCESS")) {
			Donation donation = donationService.getByOrderId(orderId);
			long id = projectService.saveOrUpdate(donation.getProject().getProjectId(),donation.getEstimate(),donation.getStatus(),donation.getCollectedAmount());
			donation.setPaymentStatus(status);
			requirementService.updateRequirements(donation);
			return ResponseEntity.ok().body(donationService.savePaymentUser(donation));
		}
		else{
			Donation donation = donationService.getByOrderId(orderId);
			donation.setPaymentStatus(status);
			return ResponseEntity.ok().body(donationService.savePaymentUser(donation));
		}
	}

	@GetMapping("/donate/trustDonation/trust/{order_id}/{status}")
	public ResponseEntity<TrustDonation> getPaymentTrust(@PathVariable("order_id") String orderId,@PathVariable("status") String status) {
		if(status.equals("SUCCESS")) {
			TrustDonation donation = trustDonationService.getByOrderId(orderId);
			donation.setPaymentStatus(status);
			return ResponseEntity.ok().body(trustDonationService.saveTrustUser(donation));
		}
		else{
			TrustDonation donation = trustDonationService.getByOrderId(orderId);
			donation.setPaymentStatus(status);
			return ResponseEntity.ok().body(trustDonationService.saveTrustUser(donation));
		}
	}

	@PostMapping("/donate/trustDonation")
	public ResponseEntity<TrustDonation> saveTrustUser(@RequestBody TrustDonation donation) {
		TrustDonation responseDonation = trustDonationService.saveTrustUser(donation);
		return ResponseEntity.ok().body(responseDonation);
	}
	
	
	private  String generateTrackNumber() {
	
	 String result = new SecureRandom().ints(0,36)
	            .mapToObj(i -> Integer.toString(i, 36))
	            .map(String::toUpperCase).distinct().limit(8).collect(Collectors.joining())
	            ;
	 return result;
	}

}