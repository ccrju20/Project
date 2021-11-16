import { React } from "react";
import { Box, Typography } from "@material-ui/core";

const Confirmation = (props) => {
  return (
    <Box mt={2}>
      <Typography align="center" variant="h5">
        Thank you for your purchase!
      </Typography>
      <br></br>
      <Typography align="center" variant="body1">
        Your order number is #{props.ordernumber}
      </Typography>
    </Box>
  );
};

export default Confirmation;
