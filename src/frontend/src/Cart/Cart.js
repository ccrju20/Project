import { React, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Box } from "@material-ui/core";
import CartProduct from "./CartProduct";
import Divider from "@material-ui/core/Divider";
import CartContext from "../store/cart-context";
import Button from "@mui/material/Button";
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

  const cartItemDeleteHandler = (option) => {
    cartCtx.deleteItem(option);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const cartTotalItems = cartCtx.items.length;
  console.log(cartCtx.totalAmount);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Grid container justifyContent="center">
          <Box mt={3} mb={2}>
            <Typography variant="h4">
              Cart
              <ShoppingBasketTwoToneIcon
                style={{ marginBottom: -5, marginLeft: 5 }}
                fontSize="large"
              />
            </Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="center">
          <Box mb={3}>
            <Typography variant="body1">
              You have {cartTotalItems} item(s) in your cart
            </Typography>
          </Box>
        </Grid>
        <Grid container spacing={3}>
          {cartCtx.items.map((product) => (
            <Grid item xs={12} key={product.option}>
              <CartProduct
                key={product.option}
                name={product.name}
                price={product.price}
                image={product.img}
                amount={product.amount}
                option={product.option}
                onAdd={cartItemAddHandler.bind(null, product)}
                onRemove={cartItemRemoveHandler.bind(null, product.id)}
                onDelete={cartItemDeleteHandler.bind(null, product.option)}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cartdivider}></div>
        <Divider variant="middle" />

        <Box mt={3} mb={3}>
          <Grid container justifyContent="center">
            <Grid item xs={5}>
              {cartTotalItems > 0 ? (
                <>
                  <Box mt={1} mb={2}>
                    <Typography align="center" variant="body2">
                      Subtotal: {totalAmount}
                    </Typography>
                    <Typography align="center" variant="h5">
                      Total: {totalAmount}
                    </Typography>
                  </Box>
                  <Link
                    component={RouterLink}
                    to="/check"
                    color="inherit"
                    underline="none"
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      sx={{
                        backgroundColor: "#290052",
                        "&:hover": {
                          backgroundColor: "#430085",
                        },
                      }}
                    >
                      Checkout
                    </Button>
                  </Link>
                </>
              ) : (
                <Link
                  component={RouterLink}
                  to="/shop"
                  color="inherit"
                  underline="none"
                >
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                      backgroundColor: "#290052",
                      "&:hover": {
                        backgroundColor: "#430085",
                      },
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>
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
