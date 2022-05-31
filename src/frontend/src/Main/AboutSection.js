import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  useMediaQuery,
} from "@mui/material";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#4E4B61",
    color: "#FFFFFF",
    marginBottom: 80,
  },
  about: {
    paddingTop: "60px",
    paddingBottom: "60px",
    paddingLeft: "30px",
    paddingRight: "0px",
  },
  aboutSmall: {
    padding: "0px",
  },
});

const AboutSection = () => {
  const classes = useStyles();
  const matchesSmall = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Grid item container className={classes.root}>
        <Grid item xs={false} />
        <Grid item xs={12}>
          <Grid item container>
            <Grid
              item
              xs={12}
              sm={6}
              className={matchesSmall ? classes.about : classes.aboutSmall}
            >
              <Card
                sx={{
                  borderRadius: 0,
                  boxShadow: "none",
                  "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                }}
              >
                <CardMedia
                  height={370}
                  component="img"
                  image="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=789&q=80"
                  alt="item"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.about}>
              <Box mt={3}>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ letterSpacing: 3, marginTop: 5, marginBottom: 5 }}
                >
                  Freshly Baked Pastries
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ letterSpacing: 3, marginBottom: 5 }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={false} />
        </Grid>
      </Grid>
    </>
  );
};

export default AboutSection;
