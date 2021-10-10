import { React, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid } from "@material-ui/core";
import CartProduct from "./CartProduct";
import Divider from "@material-ui/core/Divider";
import CartContext from "../store/cart-context";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import ShoppingBasketTwoToneIcon from '@mui/icons-material/ShoppingBasketTwoTone';

const useStyles = makeStyles((theme) => ({
  button: {
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
}));

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2).replace("-0", "0")}`;
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
  const cartTotalItems = cartCtx.items.length;

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <h1>
          Cart <ShoppingBasketTwoToneIcon style={{marginLeft: 10}} />
        </h1>
        <Grid container justify="center">
          <h3>You have {cartTotalItems} item(s) in your cart</h3>
        </Grid>

        {/* {cartCtx.totalAmount <= 0 && "You have no items in your cart"} */}
        <Grid container spacing={3}>
          {cartCtx.items.map((product) => (
            <Grid item xs={12} key={product.id}>
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
            </Grid>
          ))}
        </Grid>

        <div>
          <br></br>
          <br></br>
          <Divider variant="fullWidth" /> <br></br>
          <h3>Subtotal: {totalAmount}</h3>
          <h3>Total: {totalAmount}</h3>
          <br></br>
          {cartTotalItems > 0 && (
            <Link
              component={RouterLink}
              to="/checkout"
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
      <Grid item xs={1} />
    </Grid>
  );
};

export default Cart;
