import React from "react";
import Content from "./Content";
import { Grid, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "#9B89A4",
    color: "#837D7D",
  },
});

const Shop = () => {
  const classes = useStyles();

  return (
    <Grid item container>
      <AppBar className={classes.root} position="static">
        <Toolbar></Toolbar>
      </AppBar>
      <Grid item xs={1} sm={2} />
      <Grid item xs={10} sm={9}>
        <Grid container justify="center">
          <Grid item>
            <br></br>
            <h3>Baked Goods</h3>
            <br></br>
          </Grid>

          <Grid item>
            <Content />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={1} />
    </Grid>
  );
};

export default Shop;
