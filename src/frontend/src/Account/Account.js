import React, { useContext } from "react";

import { Grid, Box, Typography } from "@mui/material";
import Login from "./Login";
import AuthContext from "../store/auth-context";
import AccountTabs from "./AccountOptions/AccountTabs";

const Account = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Grid container mb={20}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        {!authCtx.isLoggedIn ? (
          <Login />
        ) : (
          <>
            <Box mt={2} mb={4}>
              <Typography variant="h5" color="text.secondary">Your Account</Typography>
            </Box>
            <AccountTabs />
          </>
        )}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Account;
