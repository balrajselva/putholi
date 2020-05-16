package com.revamp.core.service;

import com.revamp.core.model.FundAllotment;

import java.util.List;

public interface FundAllotmentService {
    void saveFund(List<FundAllotment> fundMaster);

    List<FundAllotment> findBySchoolId(long schoolId);
}
