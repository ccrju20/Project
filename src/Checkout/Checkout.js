import { React, useState, useCallback } from "react";

import { Grid } from "@material-ui/core";
import EnterInfo from "./Form/EnterInfo";
import CheckoutCartList from "./OrderSummary/CheckoutCartList";
import Confirmation from "./Confirmation";
import ConfirmInfo from "./ConfirmInfo";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  divider: {
    borderRight: "1px solid lightgrey",
    height: "30em",
    marginRight: 60,
    marginBottom: 60,
  },
  smdivider: {
    borderBottom: "5px solid lightgrey",
  },
}));

const Checkout = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setConfirmedInfo] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
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
  };

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        {isSubmitted ? (
          <Grid container justify="center">
            {isConfirmed ? (
              <Confirmation ordernumber={orderNumber} />
            ) : (
              <ConfirmInfo
                confirmation={confirmInfo}
                ordernumber={handleOrderNumber}
              />
            )}
          </Grid>
        ) : (
          <>
            <h1> Checkout </h1>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <EnterInfo submitForm={submitForm} />
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
          </>
        )}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Checkout;
