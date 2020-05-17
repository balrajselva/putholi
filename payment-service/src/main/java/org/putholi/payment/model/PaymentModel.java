package org.putholi.payment.model;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Component
@Data
public class PaymentModel {
	
	private String webLink;
	private String orderID;
}
