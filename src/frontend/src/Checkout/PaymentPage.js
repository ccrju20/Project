import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentForm from "./Form/PaymentForm";
import UserInfoContext from "../store/userinfo-context";
import { Grid, Box, Typography } from "@material-ui/core";
import CartContext from "../store/cart-context";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CheckoutCartList from "./OrderSummary/CheckoutCartList";
import Button from "@mui/material/Button";
import DataObject from "./DataObject";

const ORDERS_REST_API_URL = "api/v1/orders";

const PAYMENT_INTENT_REST_API_URL =
  "api/v1/payment/create-payment-intent";

// env var
const stripePromise = loadStripe(
  "pk_test_51KOQICI7AFq6GjKYYTPlwHtznGbgswqahPKsN9LMNgsu7A9Enj9L80WsjPGvoDF8TvPrDPP3GEJA7VKqjqQemrj600uhdiiVpO"
);

const PaymentPage = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const userContext = useContext(UserInfoContext);
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const { dataObject, scheduledTime } = DataObject();

  useEffect(() => {
    axios
      .post(PAYMENT_INTENT_REST_API_URL, { items: cartCtx.items })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        // console.log(res.data);
      });

    localStorage.removeItem("ordernumber");
  }, [cartCtx.items]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const {
    firstname,
    lastname,
    email,
    phone,
    address,
    addresstwo,
    city,
    state,
    postal,
    when,
    pickup,
  } = userContext.info;

  const total = localStorage.getItem("total");

  const handleBack = () => {
    props.handleBack();
  };

  const submit = async (paymentIntentId) => {
    dataObject["paymentId"] = paymentIntentId;

    try {
      const resp = await axios.post(ORDERS_REST_API_URL, dataObject);
      localStorage.setItem("ordernumber", resp.data.ordernumber);      
    } catch {
      console.log("backend error");
    }

    navigate("/ordersuccess");

    cartCtx.items.forEach((item) => {
      cartCtx.deleteItem(item.option);
    });
  };

  return (
    <>
      <Button onClick={handleBack}>Back</Button>
      <Box mb={3}>
        <Grid container justifyContent="center">
          <Typography variant="h5">Your Order Details </Typography>
        </Grid>
      </Box>
      <Grid container justifyContent="space-evenly">
        <Grid item xs={12} sm={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="Contact Info" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  {firstname} {lastname}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {email}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {!pickup && (
                    <>
                      {address.toUpperCase()} {addresstwo.toUpperCase()} <br />
                      {`${city.toUpperCase()}, `} {state.toUpperCase()} {postal}
                    </>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {phone}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {pickup ? "PICKUP :" : "DELIVERY :"}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {when !== "ASAP" ? scheduledTime : when}
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box mt={3} mb={2}>
            <Typography variant="h5">Enter Card Details</Typography>
          </Box>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm submit={submit} />
            </Elements>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <CheckoutCartList />
        </Grid>
        <h3>{total}</h3>
      </Grid>
    </>
  );
};

export default PaymentPage;
