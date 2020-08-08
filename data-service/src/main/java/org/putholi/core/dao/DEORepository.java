package org.putholi.core.dao;

import org.putholi.core.model.DEOInfo;
import org.putholi.core.model.School;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface DEORepository extends CrudRepository<DEOInfo, Long> {

    @Query("FROM DEOInfo d where d.project_id = :projectId")
    DEOInfo findBySchoolId(@Param("projectId") long projectId);
}

