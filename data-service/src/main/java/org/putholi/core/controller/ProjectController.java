package org.putholi.core.controller;

import com.sun.tracing.dtrace.ProviderAttributes;
import org.putholi.core.model.Payload;
import org.putholi.core.model.Project;
import org.putholi.core.model.SchoolRegFormModel;
import org.putholi.core.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

	@PostMapping("/project/updateStatus/{id}/{status}")
	public ResponseEntity updateStatus(@PathVariable("id") long projectId, @PathVariable("status")String status ){
		projectService.updateProjectStatus(projectId,status);
		return ResponseEntity.ok().body("Success");
	}

	@PostMapping("/project/updateReceiptComments")
	public ResponseEntity updateReceiptStatus(@RequestBody Payload payload){
		projectService.updateReceiptComments(payload.getProjectId(),payload.getAdminComments());
		return ResponseEntity.ok().body("Success");
	}
}