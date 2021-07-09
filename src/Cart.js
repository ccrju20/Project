import { React, useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CartProduct from "./CartProduct";

const Cart = (props) => {
  const backHandler = () => {
    props.cartStatus(false);
  };

  return (
    <>
    <h1>Cart</h1>
    <Button variant="contained" color="primary" onClick={backHandler}>
            Go back
          </Button>
        <Grid item xs={false} sm={12}>
          {props.cart.map((product) => (
            <CartProduct
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              updatedPrice={product.updatedPrice}
              image={product.img}
              qt={product.qt}
              onDelete={props.onDelete}
            />
          ))}
          </Grid>
    </>
  );
};

export default Cart;
