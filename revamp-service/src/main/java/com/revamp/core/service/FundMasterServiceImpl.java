package com.revamp.core.service;

import com.revamp.core.dao.FundMasterRepository;
import com.revamp.core.model.FundMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FundMasterServiceImpl implements FundMasterService{
    @Autowired
    private FundMasterRepository fundMasterRepository;

    @Override
    public void saveFund(List<FundMaster> fundMaster) {
        fundMasterRepository.saveAll(fundMaster);
    }

    @Override
    public List<FundMaster> findBySchoolId(long schoolId) {
        return fundMasterRepository.findAllBySchoolId(schoolId);
    }
}
