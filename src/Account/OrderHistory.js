import React, { useContext } from "react";

import { Grid, Box, Typography } from "@material-ui/core";
import AuthContext from "../store/auth-context";

const OrderHistory = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Typography component={"span"} variant="body1">
        Order History
      </Typography>
    </>
  );
};

export default OrderHistory;
