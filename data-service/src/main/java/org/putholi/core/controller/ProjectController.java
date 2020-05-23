package org.putholi.core.controller;

import org.putholi.core.model.Project;
import org.putholi.core.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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