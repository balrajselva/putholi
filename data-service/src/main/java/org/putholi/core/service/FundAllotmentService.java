package org.putholi.core.service;

import org.putholi.core.model.FundAllotment;

import java.util.List;

public interface FundAllotmentService {
    void saveFund(List<FundAllotment> fundMaster);

    List<FundAllotment> findBySchoolId(long schoolId);
}
