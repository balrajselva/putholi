package com.revamp.core.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revamp.core.model.Donation;
import com.revamp.core.service.DonationService;

/**
 * 
 * @author PuthirDevTeam
 *
 */
@RestController
public class DonationController {

	@Autowired
	private DonationService donationService;

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

}