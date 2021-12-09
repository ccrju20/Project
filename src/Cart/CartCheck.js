import { React, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CartContext from "../store/cart-context";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import SnackbarAlert from "../Cart/SnackbarAlert";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: 0,
    marginTop: 5,
    marginLeft: 5,
  },
  cardAction: {
    padding: 0,
    marginTop: 5,
  },
}));

const CartCheck = (props) => {
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

  return (
    <Grid container>
      {/* <Grid item xs={1} />
      <Grid item xs={10}> */}
      <Box>
        <Typography variant="h3">
          Cart <ShoppingBasketTwoToneIcon fontSize="large" />
        </Typography>
      </Box>
      <Box mb={5}>
        <Typography variant="body1">
          You have {cartTotalItems} item(s) in your cart
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {cartCtx.items.map((product) => (
          <Grid item xs={12} key={product.id}>
            <Card>
              <Grid container>
                <Grid item xs={3}>
                  <CardMedia
                    component="img"
                    height="80"
                    sx={{ width: "100%" }}
                    image={product.img}
                    alt="product"
                  />
                </Grid>

                <Grid item xs={3}>
                  <CardHeader
                  titleTypographyProps={{variant: 'body1'}}
                    className={classes.cardContent}
                    title={product.name}
                    sx={{ padding: "0px" }}
                    subheader={`$${(product.price * product.amount).toFixed(
                      2
                    )}`}
                  />
                  {/* <CardContent className={classes.cardContent}>
                    <Typography>{`$${(product.price * product.amount).toFixed(
                      2
                    )}`}</Typography>
                  </CardContent> */}
                </Grid>

                <Grid item xs={4}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <IconButton className={classes.cardAction}>
                        <ArrowDropUpIcon />
                      </IconButton>
                    </Grid>
                    {product.amount}
                    <Grid item>
                      <IconButton className={classes.cardAction}>
                        <ArrowDropDownIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={2}>
                  <Box mt={2}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Card>
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
            <Link
              component={RouterLink}
              to="/cart"
              color="inherit"
              underline="none"
            >
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
              >
                Go to Cart
              </Button>
            </Link>
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
      {/* </Grid>
      <Grid item xs={1} /> */}
    </Grid>
  );
};

export default CartCheck;
