import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Box } from "@material-ui/core";

const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          props.setMessage("Payment succeeded!");
          break;
        case "processing":
          props.setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          props.setMessage("Your payment was not successful, please try again.");
          break;
        default:
          props.setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    props.submit();

    const { error } = await stripe.confirmPayment({
      elements,
        confirmParams: {
          return_url: "http://localhost:3000/ordersuccess",
        },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />

      <Box mt={5}>
        <Button
          disabled={isLoading || !stripe || !elements}
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            backgroundColor: "#290052",
            "&:hover": {
              backgroundColor: "#430085",
            },
          }}
        >
          {isLoading ? <CircularProgress /> : "Confirm Order"}
        </Button>
      </Box>

      {/* Show any error or success messages */}
      {message && <h3>{message}</h3>}
    </form>
  );
};

export default PaymentForm;
