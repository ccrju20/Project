import React from "react";

import { Grid } from "@material-ui/core";

const Account = (props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <h1>Your Account</h1>
          <h4>Order History</h4>
          <h4>Subscriptions</h4>
          <h4>Account Info</h4>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
};

export default Account;
