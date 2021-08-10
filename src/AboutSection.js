import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#C5BCDB",
    color: "#FFFFFF",
  },
  about: {
    margin: "0px",
    padding: "100px"
  }
});

const AboutSection = () => {
  const classes = useStyles();

  return (
    <Grid item container className={classes.root}>
      <Grid item xs={false} />
      <Grid item xs={12}>
        <Grid item container>
          <Grid item xs={6} className={classes.about}>
            <h2>New Section</h2>
          </Grid>
          <Grid item xs={6}>
            <p>
              This is a new section, yay! This is a new section, yay! This is a
              new section, yay! This is a new section, yay!This is a new
              section, yay! This is a new section, yay!This is a new section,
              yay! This is a new section, yay! This is a new section, yay! This
              is a new section, yay! This is a new section, yay! This is a new
              section, yay!This is a new section, yay! This is a new section,
              yay!This is a new section, yay! This is a new section, yay! This
              is a new section, yay! This is a new section, yay! This is a new
              section, yay! This is a new section, yay!This is a new section,
              yay! This is a new section, yay!This is a new section, yay! This
              is a new section, yay! This is a new section, yay! This is a new
              section, yay! This is a new section, yay! This is a new section,
              yay!This is a new section, yay! This is a new section, yay!This is
              a new section, yay! This is a new section, yay!
            </p>
          </Grid>
        </Grid>
        <Grid item xs={false} />
      </Grid>
    </Grid>
  );
};

export default AboutSection;
