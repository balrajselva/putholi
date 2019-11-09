package com.revamp.core.model;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
public class SchoolRegFormModel {

    private String payload;

  	private MultipartFile[] files;

}
