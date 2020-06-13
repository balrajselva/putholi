package org.putholi.payment.model;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class PaymentModel {
	
	private String webLink;
	private String orderID;
}
