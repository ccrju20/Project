import { React, useContext, useState, useCallback } from "react";

import { Grid } from "@material-ui/core";
import EnterInfo from "./EnterInfo";
import CheckoutCartList from "./CheckoutCartList";
import Confirmation from "./Confirmation";
import UserInfoProvider from "../store/UserInfoProvider";
import ConfirmInfo from "./ConfirmInfo";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  divider: {
    borderRight: "1px solid lightgrey",
    height: "30em",
    marginRight: 60,
    marginBottom: 60,
  },
  cartdivider: {
    marginTop: 5,
    marginBottom: 5,
    width: "50%",
    marginLeft: 15,
  },
  button: {
    marginTop: 10,
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
}));

const Checkout = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setConfirmedInfo] = useState(false);
  const classes = useStyles();

  const submitForm = useCallback(() => {
    setIsSubmitted(true);
  }, [setIsSubmitted]);

  const confirmInfo = () => {
    setConfirmedInfo(true);
    console.log(isConfirmed);
  };

  return (
    <UserInfoProvider>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          {isSubmitted ? (
            <Grid container justify="center">
              {isConfirmed ? (
                <Confirmation />
              ) : (
                <ConfirmInfo confirmation={confirmInfo} />
              )}
            </Grid>
          ) : (
            <div>
              <h1> Checkout </h1>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <EnterInfo submitForm={submitForm} />
                </Grid>
                <Hidden only="xs">
                  <Grid item sm={1} className={classes.divider} />
                </Hidden>

                <Grid item xs={12} sm={3}>
                  <h3>Order Summary</h3>
                  <CheckoutCartList />
                  <div className={classes.cartdivider}>
                    <Divider flexItem={true} /> <h5>Total: </h5>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      type="submit"
                    >
                      Place Order
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </UserInfoProvider>
  );
};

export default Checkout;
