import { React } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const ConfirmSuccess = () => {
  let number = localStorage.getItem("ordernumber");
  const orderNumber = number.substr(0, 8)

  return (
    <Box mt={5} mb={10}>
      <Typography align="center" variant="h4">
        Thank you for your purchase!
        <Box mt={2} mb={3}>
          <SentimentSatisfiedAltIcon fontSize="large" />
        </Box>
      </Typography>

      <Grid container justifyContent="center">
        <Typography variant="subtitle1">
          YOUR ORDER NUMBER IS #{orderNumber}
        </Typography>
      </Grid>
    </Box>
  );
};

export default ConfirmSuccess;
