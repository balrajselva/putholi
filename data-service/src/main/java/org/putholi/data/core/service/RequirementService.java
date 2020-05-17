package org.putholi.data.core.service;

import java.util.List;

import org.putholi.data.core.model.Donation;
import org.putholi.data.core.model.Requirement;

public interface RequirementService {
	
	public List<Requirement> findBySchoolId(long id);

	void updateRequirements(Donation donation);
}
