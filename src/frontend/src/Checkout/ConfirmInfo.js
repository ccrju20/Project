import { React, useContext, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Grid, Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserInfoContext from "../store/userinfo-context";
import CartContext from "../store/cart-context";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Logo from "../Logo";

const ORDERS_REST_API_URL = "http://localhost:8080/api/orders";

const useStyles = makeStyles((theme) => ({
  button: {
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
}));

const ConfirmInfo = (props) => {
  const classes = useStyles();
  const userContext = useContext(UserInfoContext);
  const cartCtx = useContext(CartContext);
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState();

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
      // account: {
      //   id: 2,
      // },
    },
  };

  const onConfirmHandler = () => {
    setConfirmed(true);
    console.log(DataObject);

    axios.post(ORDERS_REST_API_URL, DataObject).then((response) => {
      console.log(response.data.ordernumber);
      setOrderNumber(response.data.ordernumber);
    });

    cartCtx.items.forEach((item) => {
      cartCtx.deleteItem(item.id);
    });
  };

  return (
    <>
      {/* <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}> */}
          {!confirmed ? (
            <>
              <Typography variant="h5">
                Please confirm your information:
              </Typography>
              <br></br>
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
                      {phone}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {address}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {city} {state} {postal}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card elevation={3}>
                <CardHeader title="Order Items" />
                <CardContent>
                  <Grid container spacing={3}>
                  </Grid>
                </CardContent>
              </Card>
              
              {/* <Button
                onClick={onConfirmHandler}
                variant="outlined"
                size="small"
                className={classes.button}
                type="submit"
              >
                Order
              </Button> */}
            </>
          ) : (
            <>
              <h1>confirmed</h1>
              <h1>{orderNumber}</h1>
            </>
          )}
        {/* </Grid>

        <Grid item xs={1} />
      </Grid> */}
    </>
  );
};

export default ConfirmInfo;
