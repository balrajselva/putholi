package com.revamp.payment.controller;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.http.client.ClientProtocolException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revamp.payment.model.PaymentModel;
import com.revamp.payment.model.RequestModel;

import in.juspay.exception.APIConnectionException;
import in.juspay.exception.APIException;
import in.juspay.exception.AuthenticationException;
import in.juspay.exception.AuthorizationException;
import in.juspay.exception.InvalidRequestException;
import in.juspay.model.JuspayEnvironment;
import in.juspay.model.Order;
import in.juspay.model.RequestOptions;

@RestController
@CrossOrigin(origins = "http://localhost")
public class PaymentController {
	
	/**
	 * 
	 * @param localityId
	 * @return
	 * @throws IOException 
	 * @throws ClientProtocolException 
	 * @throws InvalidRequestException 
	 * @throws AuthenticationException 
	 * @throws AuthorizationException 
	 * @throws APIConnectionException 
	 * @throws APIException 
	 */
	@PostMapping("/orders")
	public ResponseEntity<PaymentModel> getPayment(@RequestBody RequestModel paymentModel) throws ClientProtocolException, IOException, APIException, APIConnectionException, AuthorizationException, AuthenticationException, InvalidRequestException {
		
		 JuspayEnvironment.withBaseUrl(JuspayEnvironment.PRODUCTION_BASE_URL);
		JuspayEnvironment
         .withApiKey("E351982FF2D407D823FB87C7913CEC").withMerchantId("PUTR_TEST");
		
		String orderId = UUID.randomUUID().toString().substring(0, 12);
		Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("order_id", orderId);
        params.put("amount", paymentModel.getAmount());
        RequestOptions requestOptions = RequestOptions.createDefault().withApiVersion("2018-07-01");
        Order order = Order.create(params, requestOptions);
        PaymentModel payModel = new PaymentModel();
        payModel.setWebLink(order.getPaymentLinks().getWebLink());
        payModel.setOrderID(order.getOrderId());
        
        
        return ResponseEntity.ok().body(payModel);
        
	
	}

}
