package com.revamp.core.service;

import com.revamp.core.model.FundMaster;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FundMasterService {
    void saveFund(List<FundMaster> fundMaster);

    List<FundMaster> findBySchoolId(long schoolId);
}
