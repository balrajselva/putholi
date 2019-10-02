package com.revamp.core.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

}
