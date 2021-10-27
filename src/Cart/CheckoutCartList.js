import { React, useContext } from "react";
import CartContext from "../store/cart-context";

import List from "@mui/material/List";
import CartListItem from "./CartListItem";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  cartdivider: {
    marginTop: 5,
    marginBottom: 5,
    width: "80%",
    marginLeft: 15,
  },
  button: {
    marginTop: 10,
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  }
}));

const CheckoutCartList = () => {
  const cartCtx = useContext(CartContext);
  const classes = useStyles();

  const { totalAmount } = cartCtx;
  const total = `${(totalAmount).toFixed(2)}`

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
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
      <div className={classes.cartdivider}>
        <Divider flexItem={true} /> <h5>Total: ${total} </h5>
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          type="submit"
        >
          Review Order
        </Button>
      </div>
    </>
  );
};

export default CheckoutCartList;
