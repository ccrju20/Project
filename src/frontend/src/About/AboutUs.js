import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Card, CardMedia } from "@mui/material";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#4E4B61",
    color: "#FFFFFF",
    marginBottom: 80,
  },
  about: {
    paddingTop: "60px",
    paddingBottom: "60px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
});

const AboutUs = () => {
  const classes = useStyles();

  return (
    <>
      <Box mt={10} mb={15}>
        <Grid item container className={classes.root}>
          <Grid item xs={false} />
          <Grid item xs={12}>
            <Grid item container>
              <Grid item xs={12} sm={6} className={classes.about}>
                <Box mt={3}>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{ letterSpacing: 3, marginBottom: 3, marginTop: 3 }}
                  >
                    About Us
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ letterSpacing: 2, marginBottom: 3 }}
                  >
                    Lorem ipsum dolor sit amet 2021, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                    <br />
                    <br />
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.about}>
                <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
                  <CardMedia
                    height={375}
                    component="img"
                    image="https://images.unsplash.com/photo-1600353565737-2427a1ba3d3a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
                    alt="item"
                  />
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={false} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default AboutUs;
