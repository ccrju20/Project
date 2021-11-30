import React, { useContext } from "react";

import { Grid, Box, Typography } from "@material-ui/core";
import Login from "./Login";
import AuthContext from "../store/auth-context";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import AccountTabs from "./AccountTabs"

const Account = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        {!authCtx.isLoggedIn && <Login />}
        {authCtx.isLoggedIn && (
          <>
            <Box mt={2} mb={2}>
              <Typography align="center" variant="h5">
                Your Account
              </Typography>
            </Box>

            <AccountTabs />
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
