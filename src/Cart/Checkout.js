import { React, useState, useCallback } from "react";

import { Grid } from "@material-ui/core";
import EnterInfo from "./EnterInfo";
import CheckoutCartList from "./CheckoutCartList";
import Confirmation from "./Confirmation";
import UserInfoProvider from "../store/UserInfoProvider";
import ConfirmInfo from "./ConfirmInfo";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  divider: {
    borderRight: "1px solid lightgrey",
    height: "30em",
    marginRight: 60,
    marginBottom: 60,
  },
  smdivider: {
    borderBottom: "5px solid lightgrey",
  },
  cartdivider: {
    marginTop: 5,
    marginBottom: 5,
    width: "50%",
    marginLeft: 15,
  },
  button: {
    marginTop: 10,
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
}));

const Checkout = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setConfirmedInfo] = useState(false);
  const [orderNumber, setOrderNumber] = useState('')
  const classes = useStyles();

  const submitForm = useCallback(() => {
    setIsSubmitted(true);
  }, [setIsSubmitted]);

  const confirmInfo = () => {
    setConfirmedInfo(true);
    // console.log(isConfirmed);
  };

  const handleOrderNumber = (ordernumber) => {
    setOrderNumber(ordernumber);
  }

  return (
    <UserInfoProvider>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          {isSubmitted ? (
            <Grid container justify="center">
              {isConfirmed ? (
                <Confirmation ordernumber={orderNumber}/>
              ) : (
                <ConfirmInfo confirmation={confirmInfo} ordernumber={handleOrderNumber} />
              )}
            </Grid>
          ) : (
            <div>
              <h1> Checkout </h1>
              <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                  <EnterInfo submitForm={submitForm}/>
                </Grid>
                <Hidden smDown={true}>
                  <Grid item md={1} className={classes.divider} />
                </Hidden>

                <Hidden mdUp={true}>
                  <Grid item xs={12} className={classes.smdivider} />
                </Hidden>

                <Grid item xs={12} sm={12} md={4}>
                  <h3>Order Summary</h3>
                  <CheckoutCartList />
                </Grid>
              </Grid>
            </div>
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </UserInfoProvider>
  );
};

export default Checkout;
