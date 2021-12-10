import { React, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Box } from "@material-ui/core";
import CartProduct from "./CartProduct";
import Divider from "@material-ui/core/Divider";
import CartContext from "../store/cart-context";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import SnackbarAlert from "../Cart/SnackbarAlert";

const useStyles = makeStyles((theme) => ({
  button: {
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
  cartdivider: {
    marginTop: 50,
  },
}));

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2).replace("-0", "0")}`;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (product, amount) => {
    cartCtx.addItem({ ...product, amount: amount });
  };

  const cartItemDeleteHandler = (id) => {
    cartCtx.deleteItem(id);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const cartTotalItems = cartCtx.items.length;

  // console.log(cartCtx.items)
  // console.log(cartCtx.totalAmount)

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <h1>
          Cart <ShoppingBasketTwoToneIcon style={{ marginLeft: 10 }} />
        </h1>
        <Grid container justifyContent="center">
          <h3>You have {cartTotalItems} item(s) in your cart</h3>
        </Grid>
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
        <div className={classes.cartdivider}></div>
        <Divider variant="middle" />
        <Box mt={2} mb={2}>
          <Typography align="center" variant="body2">
            Subtotal: {totalAmount}
          </Typography>
          <Typography align="center" variant="h6">
            Total: {totalAmount}
          </Typography>
          <Box mt={2}>
            <Grid container justifyContent="center">
              {cartTotalItems > 0 && (
                <Link
                  component={RouterLink}
                  to="/check"
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
            </Grid>
          </Box>
        </Box>
        <SnackbarAlert
          open={open}
          close={handleClose}
          severity="success"
          message="Removed from Cart"
        />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Cart;
