package org.putholi.core.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@Setter
@ToString
public class SchoolRegFormModel {

    private String payload;

  	private MultipartFile[] files;

  	private MultipartFile[] preImage;

  	private MultipartFile[] postImage;

  	private MultipartFile[] receipt;
}
