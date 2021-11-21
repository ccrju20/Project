import React, { useContext } from "react";

import { Grid } from "@material-ui/core";
import Login from "./Login";
import AuthContext from "../store/auth-context";

const Account = (props) => {
  const authCtx = useContext(AuthContext);

  return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          {!authCtx.isLoggedIn && <Login />}
          {authCtx.isLoggedIn && (
            <>
              <h1>Your Account</h1>
              <h4>Order History</h4>
              <h4>Subscriptions</h4>
              <h4>Account Info</h4>
              <p>
                <button onClick={authCtx.onLogout}>Logout</button>
              </p>
            </>
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
  );
};

export default Account;
