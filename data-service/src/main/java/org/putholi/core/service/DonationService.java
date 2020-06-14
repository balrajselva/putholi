package org.putholi.core.service;

import org.putholi.core.model.Donation;
import org.putholi.core.payload.DonationPayLoad;
import org.putholi.core.payload.TrackDonationResponsePayLoad;

public interface DonationService {

	Donation donate(Donation donation);

	Donation get(long id);
	
	Donation donate(DonationPayLoad donationPayLoad);
	
	TrackDonationResponsePayLoad findMyDonation(String trackingId);

	Donation savePaymentUser(Donation donation);

	Donation getByOrderId(String orderId);
}
