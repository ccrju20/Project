import { React } from "react";
import { Grid } from "@material-ui/core";
import CartProduct from "./CartProduct";

const Cart = (props) => {

  return (
    <>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          {" "}
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
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
};

export default Cart;
