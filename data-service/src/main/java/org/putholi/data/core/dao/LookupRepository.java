package org.putholi.data.core.dao;

import org.putholi.data.core.model.Lookup;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LookupRepository extends CrudRepository<Lookup, Long> {

	@Query("SELECT l FROM Lookup l where l.parent_field = :parentField and l.parent_key = :parentKey")
    List<Lookup> lookupByParent( @Param("parentField") String parentField,
                                @Param("parentKey") String parentKey);


	@Query("SELECT l FROM Lookup l where l.parent_key = :field")
    List<Lookup> lookup(@Param("field") String field);

	@Query("SELECT DISTINCT parent_key from Lookup ORDER BY parent_key")
	List<Lookup> getAll();
}
