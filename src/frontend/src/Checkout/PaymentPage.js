import { React, useState, useEffect, useContext } from "react";
import PaymentForm from "./Form/PaymentForm";
import { Grid, Box, Typography } from "@material-ui/core";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import UserInfoContext from "../store/userinfo-context";
import CartContext from "../store/cart-context";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CheckoutCartList from "./OrderSummary/CheckoutCartList";
import Button from "@mui/material/Button";

const ORDERS_REST_API_URL = "http://localhost:8080/api/orders";

const PAYMENT_INTENT_REST_API_URL =
  "http://localhost:8080/api/create-payment-intent";
const stripePromise = loadStripe(
  "pk_test_51KOQICI7AFq6GjKYYTPlwHtznGbgswqahPKsN9LMNgsu7A9Enj9L80WsjPGvoDF8TvPrDPP3GEJA7VKqjqQemrj600uhdiiVpO"
);

const PaymentPage = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const userContext = useContext(UserInfoContext);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    axios
      .post(PAYMENT_INTENT_REST_API_URL, { items: cartCtx.items })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        console.log(res.data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  /// From ConfirmInfo
  console.log(userContext.info);

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
    scheduled,
    when,
    pickup,
  } = userContext.info;

  let scheduledTime = "";

  if (when !== "ASAP") {
    scheduledTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(scheduled);
  } else {
    scheduledTime = "ASAP";
  }

  let cartItems = [];
  cartCtx.items.forEach((item) => {
    cartItems.push({
      quantity: `${item.amount}`,
      product: {
        id: item.id,
      },
      productOption: {
        id: item.option,
      },
      total_price: `${(item.amount * item.price).toFixed(2)}`,
    });
  });

  let method = 0;
  if (!pickup) {
    method = 1;
  }
  const DataObject = {
    orderItems: cartItems,
    scheduled: scheduledTime,
    status: "processing",
    delivery: method,
    orderDetails: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      address: address,
      addresstwo: addresstwo,
      city: city,
      state: state,
      postal: postal,
    },
  };

  const user = localStorage.getItem("user");
  if (user) {
    let userId = JSON.parse(user).theId;
    DataObject.account = { id: userId };
  }

  const handleBack = () => {
    props.handleBack();
  };

  const submit = () => {
    axios.post(ORDERS_REST_API_URL, DataObject).then((response) => {
      localStorage.setItem(
        "ordernumber",
        JSON.stringify(response.data.ordernumber)
      );
    });

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
                  {address} {city} {state} {postal}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {phone}
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
      </Grid>
    </>
  );
};

export default PaymentPage;