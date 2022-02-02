import { React } from "react";
import { Box, Typography } from "@material-ui/core";

const ConfirmSuccess = () => {
  const orderNumber = localStorage.getItem("ordernumber");

  return (
    <Box mt={2}>
      <Typography align="center" variant="h5">
        Thank you for your purchase!
      </Typography>
      <br></br>
      <Typography align="center" variant="body1">
        Your order number is #{orderNumber}
      </Typography>
    </Box>
  );
};

export default ConfirmSuccess;
