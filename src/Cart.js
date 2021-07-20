import { React } from "react";
import { Grid } from "@material-ui/core";
import CartProduct from "./CartProduct";
import Divider from "@material-ui/core/Divider";

const Cart = (props) => {
  let subtotal = 0;

  props.cart.map((product) => {
    subtotal += product.updatedPrice;
  });

  return (
    <>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <h1>Cart</h1>
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
          <div>
            <br></br>
            <br></br>
            <Divider variant="fullWidth" /> <br></br>
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
            <h3>Total: ${subtotal.toFixed(2)}</h3>
          </div>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </>
  );
};

export default Cart;
