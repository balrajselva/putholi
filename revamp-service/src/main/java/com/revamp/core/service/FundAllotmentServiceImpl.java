package com.revamp.core.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.FundAllotmentRepository;
import com.revamp.core.model.FundAllotment;

/**
 * 
 * @author Puthyir Dev Team
 *
 */
@Service
@Transactional
public class FundAllotmentServiceImpl implements FundAllotmentService {

	@Autowired
	private FundAllotmentRepository fundAllotmentRepository;

	@Override
	public long save(FundAllotment fundAllocation) {
		return fundAllotmentRepository.save(fundAllocation).getFundallotmentId();
	}

	@Override
	public Optional<FundAllotment> getFundAllocations(long id) {
		return fundAllotmentRepository.findById(id);
	}

	@Override
	public List<FundAllotment> getFundAllocations() {
		return (List<FundAllotment>) fundAllotmentRepository.findAll();
	}

	@Override
	public void deleteFundAllocation(long id) {
		fundAllotmentRepository.deleteById(id);

	}

}
