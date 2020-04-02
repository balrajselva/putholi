package com.revamp.core.dao;

import com.revamp.core.model.FundMaster;
import com.revamp.core.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FundMasterRepository extends CrudRepository<FundMaster, Long> {

    @Query("FROM FundMaster f where f.schoolId = :schoolId")
    List<FundMaster> findAllBySchoolId(@Param("schoolId")long schoolId);
}