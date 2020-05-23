package org.putholi.core.service;

import org.putholi.core.dao.FundAllotmentRepository;
import org.putholi.core.model.FundAllotment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FundAllotmentServiceImpl implements FundAllotmentService {
    @Autowired
    private FundAllotmentRepository fundAllotmentRepository;

    @Override
    public void saveFund(List<FundAllotment> fundMaster) {
        fundAllotmentRepository.saveAll(fundMaster);
    }

    @Override
    public List<FundAllotment> findBySchoolId(long schoolId) {
        return fundAllotmentRepository.findAllBySchoolId(schoolId);
    }
}
