import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#C5BCDB",
    color: "#FFFFFF",
    marginBottom: 80,
  },
  about: {
    margin: "0px",
    padding: "90px",
  },
  abouttext: {
    padding: "50px",
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
              <Typography variant="h3" align="center">
                New Section
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.abouttext}>
              <Typography variant="body1">
                This is a new section, yay! This is a new section, yay! This is
                a new section, yay!This is a new section, yay! This is a new
                section, yay! This is a new section, yay! This is a new section,
                yay! This is a new section, yay! This is a new section, yay!This
                is a new section, yay! This is a new section, yay!This is a new
                section, yay!
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid item sm={12} className={classes.about}>
          </Grid> */}
          <Grid item xs={false} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Box mb={10}>
          {/* <WovenImageList /> */}
        </Box>
      </Grid>
    </>
  );
};

export default AboutSection;
