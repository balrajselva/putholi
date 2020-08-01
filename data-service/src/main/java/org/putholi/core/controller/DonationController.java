package org.putholi.core.controller;

import org.putholi.core.lookup.PuthuyirLookUp;
import org.putholi.core.model.*;
import org.putholi.core.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

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

	@Autowired
	private CashCounterService cashCounterService;

	@Autowired
	private SchoolService schoolService;

	@Autowired
	private DonationOrgService donationOrgService;

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

	@PostMapping("/donate/saveOrg")
	public ResponseEntity<DonationOrg> saveOrg(@RequestBody DonationOrg donation) {
		DonationOrg donationResponse = donationOrgService.save(donation);
		return ResponseEntity.ok().body(donationResponse);
	}

	@PostMapping("/donateOrg/save")
	public ResponseEntity<DonationOrg> saveDonationOrg(@RequestBody DonationOrg donation) {
		DonationOrg donationResponse = donationOrgService.save(donation);
		return ResponseEntity.ok().body(donationResponse);
	}
	
	/**
	 * 
	 * @param donation Id
	 * @return donation
	 */
	@PostMapping("/donate/findByEmailId")
	public DonationUser findEmail(@RequestBody DonationUser donation) {
		DonationUser user= donationUserService.findByEmailAddress(donation.getEmailAddress());
		return user;
	}

	@PostMapping("/donate/findOrgByEmailId")
	public DonationOrg findOrgEmail(@RequestBody DonationOrg donation) {
		DonationOrg user= donationOrgService.findByEmailAddress(donation.getOrgEmail());
		return user;
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

	@PostMapping("/donate/findDonationOrg")
	public ResponseEntity<DonationOrg> findDonationOrg(@RequestBody DonationOrg donationOrg) {

		DonationOrg org = donationOrgService.
				findByEmailAddressPassword(donationOrg.getOrgEmail(),donationOrg.getPassword());

		if(org == null) {
			DonationOrg donationOrg1 = new DonationOrg();
			donationOrg1.setOrgEmail("email");
			return new ResponseEntity<DonationOrg>(donationOrg1,HttpStatus.OK);
		}

		return ResponseEntity.ok().body(org);
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
			System.out.println("success");
			Donation donation = donationService.getByOrderId(orderId);
			long id = projectService.saveOrUpdate(donation.getProject().getProjectId(),donation.getEstimate(),donation.getStatus(),donation.getCollectedAmount());
			donation.setPaymentStatus(status);
			requirementService.updateRequirements(donation);
			if(Objects.nonNull(donation.getDonationUser())) {
				cashCounterService.saveInflowCashDonor(donation);
			}
			else if(Objects.nonNull(donation.getDonationOrg())){
				cashCounterService.saveInflowCashOrg(donation);
			}
			if(Objects.nonNull(donation.getIsSchoolReadyForAllotment()) && donation.getIsSchoolReadyForAllotment().equals("Y")) {
				schoolService.updateSchoolStatus(donation.getSchool().getSchoolId(), PuthuyirLookUp.READY_FOR_ALLOTMENT.name());
			}
			return ResponseEntity.ok().body(donationService.savePaymentUser(donation));
		}
		else{
			System.out.println("not success");
			Donation donation = donationService.getByOrderId(orderId);
			donation.setPaymentStatus(status);
			return ResponseEntity.ok().body(donationService.savePaymentUser(donation));
		}
	}

	@GetMapping("/donate/trustDonation/trust/{order_id}/{status}")
	public ResponseEntity<TrustDonation> getPaymentTrust(@PathVariable("order_id") String orderId, @PathVariable("status") String status) {
		if(status.equals("SUCCESS")) {
			TrustDonation donation = trustDonationService.getByOrderId(orderId);
			donation.setPaymentStatus(status);
			cashCounterService.saveInflowCashTrust(donation);
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