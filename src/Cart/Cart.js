import { React, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid } from "@material-ui/core";
import CartProduct from "./CartProduct";
import Divider from "@material-ui/core/Divider";
import CartContext from "../store/cart-context";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  button: {
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
}));

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2).replace('-0', '0')}`;
  const classes = useStyles();

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (product) => {
    cartCtx.addItem({ ...product, amount: 1 });
  };

  const cartItemDeleteHandler = (id) => {
    cartCtx.deleteItem(id);
  };

  console.log(cartCtx.totalAmount);

  return (
    <>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <h1>Cart</h1>
          {cartCtx.totalAmount <= 0 && 'You have no items in your cart'}
          {cartCtx.items.map((product) => (
            <CartProduct
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.img}
              amount={product.amount}
              onAdd={cartItemAddHandler.bind(null, product)}
              onRemove={cartItemRemoveHandler.bind(null, product.id)}
              onDelete={cartItemDeleteHandler.bind(null, product.id)}
            />
          ))}
          <div>
            <br></br>
            <br></br>
            <Divider variant="fullWidth" /> <br></br>
            <h3>Subtotal: {totalAmount}</h3>
            <h3>Total: {totalAmount}</h3>
            <br></br>
            {cartCtx.totalAmount > 0 && (
              <Link
                component={RouterLink}
                to="/finalcart"
                color="inherit"
                underline="none"
              >
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                >
                  Checkout
                </Button>
              </Link>
            )}
            <br></br>
            <br></br>
            <br></br>
          </div>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </>
  );
};

export default Cart;
