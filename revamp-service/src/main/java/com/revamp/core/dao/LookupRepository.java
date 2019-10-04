package com.revamp.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revamp.core.model.Lookup;

@Repository
public interface LookupRepository extends CrudRepository<Lookup, Long> {

	@Query("FROM Lookup where field = :field and parent_field = :parentField and parent_key = :parentKey")
	public List<Lookup> lookupByParent(@Param("field") String field, @Param("parentField") String parentField,
			@Param("parentKey") String parentKey);


	@Query("FROM Lookup where field = :field")
	public List<Lookup> lookup(@Param("field") String field);

}
