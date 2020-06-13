package org.putholi.core.controller;

import org.putholi.core.payload.TrackDonationResponsePayLoad;
import org.putholi.core.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TrackDonationController {

	@Autowired
	private DonationService donationService;

	
	@GetMapping("/donation/{trackid}")
	public ResponseEntity<TrackDonationResponsePayLoad> getDonation(@PathVariable("trackid") String trackId) {
		TrackDonationResponsePayLoad payLoad = donationService.findMyDonation(trackId);
		return new ResponseEntity<TrackDonationResponsePayLoad>(payLoad, HttpStatus.OK);
	}
}
