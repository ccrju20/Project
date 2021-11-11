import React from "react";
import Content from "./Content";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "#9B89A4",
    color: "#837D7D",
  },
  divider: {
    borderRight: "2px solid lightgrey",
    height: "50em",
    marginTop: 100,
    marginRight: 30,
    marginBottom: 50,
  },
  filter: {
    marginLeft: 20,
    marginTop: 100,
    // position: 'fixed'
  },
});

const Shop = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={1} sm={1} />
      <Grid item xs={10} sm={10}>
        <Grid container>
          <Grid item xs={1} sm={3}>
            <Hidden xsDown={true}>
              <div className={classes.filter}>
                <h5>Filter by:</h5>
                <h6>Category</h6>
              </div>
            </Hidden>
          </Grid>
          <Hidden xsDown={true}>
            <Grid item className={classes.divider} />
          </Hidden>

          <Grid item xs={10} sm={8}>
            <br></br>
            <h2>Baked Goods</h2>
            <br></br>
            <Content />
          </Grid>
          <Grid item xs={1} sm={1} />
        </Grid>
      </Grid>
      <Grid item xs={1} sm={1} />
    </Grid>
  );
};

export default Shop;
