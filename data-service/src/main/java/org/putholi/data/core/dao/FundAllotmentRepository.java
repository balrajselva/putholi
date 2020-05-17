package org.putholi.data.core.dao;

import org.putholi.data.core.model.FundAllotment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FundAllotmentRepository extends CrudRepository<FundAllotment, Long> {

    @Query("FROM FundAllotment f where f.schoolId = :schoolId")
    List<FundAllotment> findAllBySchoolId(@Param("schoolId")long schoolId);
}