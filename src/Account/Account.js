import React, { useContext } from "react";

import { Grid, Box, Typography } from "@material-ui/core";
import Login from "./Login";
import AuthContext from "../store/auth-context";
import AccountTabs from "./AccountOptions/AccountTabs";
import Button from "@mui/material/Button";

const Account = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        {!authCtx.isLoggedIn ? (
          <Login />
        ) : (
          <>
            <Box mt={2} mb={3}>
              <Typography variant="h5">
                Your Account
              </Typography>
            </Box>

            <AccountTabs />
            <Box ml={5}>
              <Button
                onClick={authCtx.onLogout}
                variant="contained"
                size="small"
              >
                Logout
              </Button>
            </Box>
          </>
        )}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Account;
