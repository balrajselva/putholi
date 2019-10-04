package com.revamp.core.model;
import java.util.Arrays;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
@Data
public class SchoolRegFormModel {

    private String payload;

  	private MultipartFile[] files;


	

	

}
