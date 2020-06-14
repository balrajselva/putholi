package org.putholi.core.service;

import org.putholi.core.model.Donation;
import org.putholi.core.model.Requirement;

import java.util.List;

public interface RequirementService {
	
	List<Requirement> findBySchoolId(long id);

	void updateRequirements(Donation donation);

    Requirement updateStatus(long id, String status);

    Requirement findById(long id);

    Requirement updateInvoiceStatus(long id, String status);
}
