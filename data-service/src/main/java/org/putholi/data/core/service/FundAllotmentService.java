package org.putholi.data.core.service;

import org.putholi.data.core.model.FundAllotment;

import java.util.List;

public interface FundAllotmentService {
    void saveFund(List<FundAllotment> fundMaster);

    List<FundAllotment> findBySchoolId(long schoolId);
}
