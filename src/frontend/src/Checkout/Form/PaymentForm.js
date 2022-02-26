import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Box, Typography } from "@material-ui/core";

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
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
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

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      // confirmParams: {
      //   return_url: "http://localhost:3000/ordersuccess",
      // },
    });

    if (paymentIntent) {
      if (paymentIntent.status === "succeeded") {
        props.submit();
      }
    } else {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Show any error or success messages */}
      {message && (
        <Box mb={2}>
          <Typography color="secondary" variant="caption">
            {message}
          </Typography>
        </Box>
      )}
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
      </form>
    </>
  );
};

export default PaymentForm;
