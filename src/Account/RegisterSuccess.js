import { React } from "react";
import { Typography, Box } from "@material-ui/core";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <Box mt={2}>
      <Typography align="center" variant="h5">
        Welcome!
      </Typography>
      <br></br>
      <Typography align="center" variant="body1">
        <Link href="#" variant="body2" component={RouterLink} to="/account">
          Go to your account
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterSuccess;
