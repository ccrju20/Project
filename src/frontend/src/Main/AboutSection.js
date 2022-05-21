import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Card, CardMedia } from "@mui/material";
import cafethree from "../Images/cafe-three.jpg";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#4E4B61",
    color: "#FFFFFF",
    marginBottom: 80,
  },
  about: {
    margin: "0px",
    padding: "70px",
  },
  abouttext: {
    padding: "70px",
  },
});

const AboutSection = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item container className={classes.root}>
        <Grid item xs={false} />
        <Grid item xs={12}>
          <Grid item container>
            <Grid item xs={12} sm={6} className={classes.about}>
              <Card>
                <CardMedia
                  height={275}
                  component="img"
                  image={cafethree}
                  alt="item"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.abouttext}>
              <Box mt={3}>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ letterSpacing: 3, marginBottom: 2 }}
                >
                  Freshly Baked Pastries
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={false} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Box mb={10}>{/* <WovenImageList /> */}</Box>
      </Grid>
    </>
  );
};

export default AboutSection;
