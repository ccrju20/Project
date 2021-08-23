import React, { useContext } from "react";

import { Grid } from "@material-ui/core";
import Login from "./Login";
import AuthContext from "../store/auth-context";

const Account = (props) => {
  const ctx = useContext(AuthContext);


  const loginHandler = (email, password) => {
    props.loginStatus(email, password)
  };

  return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          {!ctx.isLoggedIn && <Login onLogin={loginHandler} />}
          {ctx.isLoggedIn && (
            <>
              <h1>Your Account</h1>
              <h4>Order History</h4>
              <h4>Subscriptions</h4>
              <h4>Account Info</h4>
              <p>
                <button onClick={ctx.onLogout}>Logout</button>
              </p>
            </>
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
  );
};

export default Account;
