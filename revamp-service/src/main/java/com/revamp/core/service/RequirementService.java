package com.revamp.core.service;

import java.util.List;
import java.util.Map;

import com.revamp.core.model.Donation;
import com.revamp.core.model.Requirement;

public interface RequirementService {
	
	public List<Requirement> findBySchoolId(long id);

	void updateRequirements(Donation donation);

    Requirement updateStatus(long id, String status);

    public Requirement findById(long id);
}
