package com.revamp.core.service;

import java.util.List;

import com.revamp.core.model.Requirement;

public interface RequirementService {
	
	public List<Requirement> findBySchoolId(long id);
	

}
