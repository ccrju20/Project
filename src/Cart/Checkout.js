import { React, useContext, useState, useCallback } from "react";

import { Grid } from "@material-ui/core";
import CartContext from "../store/cart-context";
import EnterInfo from "./EnterInfo";
import CheckoutCartList from "./CheckoutCartList";
import Confirmation from "./Confirmation";

const FinalCart = () => {
  const cartCtx = useContext(CartContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitForm = useCallback(() => {
    setIsSubmitted(true)
  }, [setIsSubmitted]);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <h1> Checkout </h1>
        <Grid container>
          <Grid item xs={12} sm={8}>
            {isSubmitted ? <Confirmation /> : <EnterInfo submitForm={submitForm} />}
          </Grid>
          <Grid item xs={12} sm={4}>
            <h3>Items in your cart</h3>
            <CheckoutCartList />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default FinalCart;
