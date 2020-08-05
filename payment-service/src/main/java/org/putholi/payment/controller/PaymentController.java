package org.putholi.payment.controller;

import in.juspay.exception.*;
import in.juspay.model.JuspayEnvironment;
import in.juspay.model.Order;
import in.juspay.model.RequestOptions;
import org.apache.http.client.ClientProtocolException;
import org.putholi.payment.model.PaymentModel;
import org.putholi.payment.model.RequestModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

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
	public ResponseEntity<?> getPayment(@RequestBody RequestModel paymentModel)
			throws ClientProtocolException, IOException, APIException, APIConnectionException, AuthorizationException,
			AuthenticationException, InvalidRequestException {
		try {
			JuspayEnvironment.withBaseUrl(JuspayEnvironment.PRODUCTION_BASE_URL);
			JuspayEnvironment.withApiKey("7DB806EF81748BD83BFB59A07AEA03").withMerchantId("PUTR_TEST");

			Map<String, Object> params = new LinkedHashMap<String, Object>();
			params.put("order_id", paymentModel.getOrder_id());
			params.put("amount", paymentModel.getAmount());
			RequestOptions requestOptions = RequestOptions.createDefault().withApiVersion("2018-07-01");
			Order order = Order.create(params, requestOptions);
			PaymentModel payModel = new PaymentModel();
			payModel.setWebLink(order.getPaymentLinks().getWebLink());
			payModel.setOrderID(order.getOrderId());
			return ResponseEntity.ok().body(payModel);
		}
		catch (Exception e){
			return ResponseEntity.ok().body(e.getMessage());
		}


	}

}
