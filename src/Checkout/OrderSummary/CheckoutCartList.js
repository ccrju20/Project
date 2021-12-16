import { React, useContext } from "react";
import CartContext from "../../store/cart-context";
import List from "@mui/material/List";
import CartListItem from "./CartListItem";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
  },
  cartdivider: {
    marginTop: 5,
    marginBottom: 10,
  },
  checkouttotal: {
    marginTop: 20,
  },
}));

const CheckoutCartList = () => {
  const cartCtx = useContext(CartContext);
  const classes = useStyles();

  const { totalAmount } = cartCtx;
  const total = `${totalAmount.toFixed(2)}`;

  // console.log(cartCtx.items);

  return (
    <Card className={classes.root} elevation={5}>
      <Box mt={2} mb={3} ml={2}>
        <Typography variant="h5">Order Summary</Typography>
      </Box>

      <List sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}>
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
      <Divider flexItem={true} />
      <div className={classes.checkouttotal}>
        <Typography align="center">Total: ${total}</Typography>
      </div>
    </Card>
  );
};

export default CheckoutCartList;
