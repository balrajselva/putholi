package org.putholi.data.core.controller;

import java.util.List;

import org.putholi.data.core.model.Lookup;
import org.putholi.data.core.service.LookupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 
 * @author PuthyirDevTeam
 *
 */
@RestController
@CrossOrigin(origins = "http://localhost")
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
			lookupList = lookupService.lookupByParent(parentField, parentKey);
		} else {
			lookupList = lookupService.lookup(field);
		}
		System.out.println(lookupList);
		return ResponseEntity.ok().body(lookupList);
	}

	@PostMapping("/lookup/save")
	public ResponseEntity saveLookup(@RequestBody Lookup lookup){
		lookupService.save(lookup);
		return new ResponseEntity("Successfully uploaded!", HttpStatus.OK);
	}

	@GetMapping("/lookup/getAll")
	public ResponseEntity getAll(){
		List<Lookup> lookupList= lookupService.getAll();
		System.out.println(lookupList);
		return ResponseEntity.ok().body(lookupList);
	}

}