package org.putholi.data.core.service;

import org.putholi.data.core.model.Donation;
import org.putholi.data.core.payload.DonationPayLoad;
import org.putholi.data.core.payload.TrackDonationResponsePayLoad;

public interface DonationService {

	Donation donate(Donation donation);

	Donation get(long id);
	
	Donation donate(DonationPayLoad donationPayLoad);
	
	TrackDonationResponsePayLoad findMyDonation(String trackingId);

	Donation savePaymentUser(Donation donation);

	Donation getByOrderId(String orderId);
}
