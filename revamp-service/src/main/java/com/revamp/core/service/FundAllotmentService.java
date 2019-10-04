package com.revamp.core.service;

import java.util.List;
import java.util.Optional;

import com.revamp.core.model.FundAllotment;

public interface FundAllotmentService {
	
	long save(FundAllotment fundAllocation);

	Optional<FundAllotment> getFundAllocations(long id);

	List<FundAllotment> getFundAllocations();
	
	void deleteFundAllocation(long id);

}
