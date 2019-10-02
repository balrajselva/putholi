package com.revamp.core.controller;

import java.util.List;

import com.revamp.core.model.Lookup;
import com.revamp.core.model.Role;
import com.revamp.core.service.LookupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
/**
 * 
 * @author PuthyirDevTeam
 *
 */
@RestController
public class LookupController {
	private final static Logger logger = LoggerFactory.getLogger(LookupController.class);
	@Autowired
private LookupService lookupService;

	
    /**
     * 
     * @param field
     * @param parentField
     * @param parentKey
     * @return
     */
	@GetMapping("/lookup/field/{field}")
	public ResponseEntity<List<Lookup>> lookup(
			@PathVariable("field") String field,
			@RequestParam(value = "parentfield", required = false) String parentField,
			@RequestParam(value = "parentkey", required = false) String parentKey) {
		
		List<Lookup> lookupList = null;
		if(parentField != null && parentKey != null) {
			lookupList = lookupService.lookupByParent(field,
				parentField, parentKey);
		} else {
			lookupList = lookupService.lookup(field);
		}
		
		return ResponseEntity.ok().body(lookupList);
}

}