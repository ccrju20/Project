import { React, useContext } from "react";
import CartContext from "../../store/cart-context";
import List from "@mui/material/List";
import CartListItem from "./CartListItem";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import { Grid, Box, Typography } from "@material-ui/core";
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
    marginBottom: 20,
  },
}));

const CheckoutCartList = () => {
  const cartCtx = useContext(CartContext);
  const classes = useStyles();

  const { totalAmount } = cartCtx;
  const total = `$${totalAmount.toFixed(2)}`;

  console.log(cartCtx.items);

  return (
    <Card className={classes.root} elevation={5}>
      <Box mt={2} mb={1} ml={2}>
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
      {/* <div className={classes.checkouttotal}> */}
      <Box mt={3} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={3}>
            <Grid container justifyContent="flex-end">
              <Typography variant="overline" align="center">
                Total:
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={3}>
            <Typography variant="h5">{total}</Typography>
          </Grid>
        </Grid>
      </Box>
      {/* </div> */}
    </Card>
  );
};

export default CheckoutCartList;
