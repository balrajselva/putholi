package com.revamp.core.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revamp.core.model.Project;
import com.revamp.core.service.ProjectService;
/**
 * 
 * @author PuthyirDevTeam
 *
 */
@RestController
public class ProjectController {

	@Autowired
	private ProjectService projectService;
    /**
     * 
     * @param project
     * @return
     */
	@PostMapping("/project")
	public ResponseEntity<Project> saveOrUpdate(@RequestBody Project project) {
		long id = projectService.saveOrUpdate(project);
		project.setProjectId(id);
		System.out.println(project);
		return ResponseEntity.ok().body(project);
	}
    /**
     * 
     * @param projectId
     * @return
     */
	@GetMapping("/project/{id}")
	public ResponseEntity<Optional<Project>> get(@PathVariable("id") long projectId) {
		Optional<Project> project = projectService.get(projectId);
		return ResponseEntity.ok().body(project);
	}

}