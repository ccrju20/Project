import { React, useContext, useState, useCallback } from "react";

import { Grid } from "@material-ui/core";
import EnterInfo from "./EnterInfo";
import CheckoutCartList from "./CheckoutCartList";
import Confirmation from "./Confirmation";

const Checkout = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitForm = useCallback(() => {
    setIsSubmitted(true);
  }, [setIsSubmitted]);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        {isSubmitted ? (
          <Grid container justify="center">
            <Confirmation />
          </Grid>
        ) : (
          <div>
            <h1> Checkout </h1>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <EnterInfo submitForm={submitForm} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <h3>Items in your cart</h3>
                <CheckoutCartList />
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Checkout;
