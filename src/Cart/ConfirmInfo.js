import { React, useContext, useState } from "react";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserInfoContext from "../store/userinfo-context";
import CartContext from "../store/cart-context";

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

  // console.log(userContext.info);

  const timestamp = Date.now();
  const timeordered =  new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timestamp)

  const {
    firstname,
    lastname,
    email,
    phone,
    address,
    city,
    state,
    postal,
    datetime
  } = userContext.info;

  let pickupordeliverytime = "";

  if (datetime !== "ASAP") {
      pickupordeliverytime = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(datetime)
  } else {
    pickupordeliverytime = "ASAP";
  }

  const [dataObject, setDataObject] = useState({
    ordernumber: "",
    dateposted: timeordered,
    customer: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      address: address,
      city: city,
      state: state,
      postal: postal
    },
    orderitems: cartCtx.items,
    pickupordelivery: pickupordeliverytime
  })

  const {} = cartCtx.items;

  const onConfirmHandler = () => {
    props.confirmation(true);
    console.log(userContext.info);
    console.log(cartCtx.items);
    console.log(cartCtx.totalAmount);
    //   new Intl.DateTimeFormat("en-US", {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit",
    //   }).format(timestamp)
    // );
    console.log(dataObject);

    cartCtx.items.forEach((item) => {
      cartCtx.deleteItem(item.id);
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>Please confirm your information below</h2>
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}>
            <h5>
              Name: {firstname} {lastname}
            </h5>
            <h5>Email: {email}</h5>
            <h5>Phone: {phone}</h5>
          </Grid>

          <Grid item xs={7}>
            <h5>Shipping Address: </h5>
            <h5>{address}</h5>
            <h5>
              {city} {state} {postal}
            </h5>
          </Grid>
        </Grid>
      </Grid>
      <Button
        onClick={onConfirmHandler}
        variant="outlined"
        size="small"
        className={classes.button}
        type="submit"
      >
        Order
      </Button>
    </Grid>
  );
};

export default ConfirmInfo;
