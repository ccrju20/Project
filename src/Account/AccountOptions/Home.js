import React, { useState, useContext, useEffect } from "react";

import { Grid, Box, Typography } from "@material-ui/core";
import ServiceContext from "../../service/service-context";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#837D7D",
  },
}));

const Home = (props) => {
  const serviceCtx = useContext(ServiceContext);
  const [data, setData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    serviceCtx.getUserInfo().then(
      (response) => {
        console.log(response);
        setData(response.data);
      },
      (error) => {
        console.log(error);
        // setData(error);
      }
    );
  }, [serviceCtx]);

  return (
    <>
      <Box mt={2} mb={5} textAlign="center">
        <AccountCircleOutlinedIcon fontSize="large" />
        <Typography variant="h4">Welcome, {data.firstname}</Typography>
        <Box mt={3} className={classes.root}>
          <Typography variant="body1">Manage your account here</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
