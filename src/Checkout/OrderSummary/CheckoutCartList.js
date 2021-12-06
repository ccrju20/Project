import { React, useContext } from "react";
import CartContext from "../../store/cart-context";
import List from "@mui/material/List";
import CartListItem from "./CartListItem";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cartdivider: {
    marginTop: 5,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
  checkoutlist: {
    padding: 24,
    paddingBottom: 40,
    marginBottom: 20,
    border: "5px solid lightgrey",
  },
  checkouttotal: {
    marginTop: 20
  }
}));

const CheckoutCartList = () => {
  const cartCtx = useContext(CartContext);
  const classes = useStyles();

  const { totalAmount } = cartCtx;
  const total = `${totalAmount.toFixed(2)}`;

  console.log(cartCtx.items)

  return (
      <div className={classes.checkoutlist}>
        <List
          sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}
        >
          {cartCtx.items.map((product) => (
            <CartListItem
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.img}
              amount={product.amount}
            />
          ))}
        </List>
        <div className={classes.cartdivider}></div>
        <Divider flexItem={true} variant="middle" />
        <div className={classes.checkouttotal}>
          <Typography align="center">Total: ${total}</Typography>
        </div>

        <Grid container justifyContent="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            type="submit"
          >
            Review Order
          </Button>
        </Grid>
      </div>
  );
};

export default CheckoutCartList;
