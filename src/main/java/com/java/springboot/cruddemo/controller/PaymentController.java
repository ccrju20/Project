package com.java.springboot.cruddemo.controller;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;
import com.java.springboot.cruddemo.service.PaymentService;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-payment-intent")
    public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePayment createPayment) {
        return paymentService.chargeItems(createPayment);
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> paymentWebhook(@RequestHeader("Stripe-Signature") String header,
                                            @RequestBody String payload) {
        Event event = null;

        if (endpointSecret != null && header != null) {
            try {
                event = Webhook.constructEvent(
                        payload, header, endpointSecret
                );
            } catch (SignatureVerificationException e) {
                System.out.println("Webhook error while validating signature.");
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        // Deserialize the nested object inside the event
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            System.out.println("deserialization failed");
        }

        // Handle the event
        switch (event.getType()) {
            case "payment_intent.succeeded":
                PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
                System.out.println("Payment id: " + paymentIntent.getId());
                System.out.println("Payment for " + paymentIntent.getAmount() + " succeeded.");
                System.out.println("Payment created: " + paymentIntent.getCreated());
                break;
            default:
                System.out.println("Unhandled event type " + event.getType());
                break;
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
