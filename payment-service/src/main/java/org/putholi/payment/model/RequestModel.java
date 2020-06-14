package org.putholi.payment.model;

import lombok.Data;

@Data
public class RequestModel {

	private String amount;

	private String order_id;
}
