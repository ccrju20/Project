import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";

const Content = () => {
  return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ProductCard />
        </Grid>
        <Grid item xs={4}>
          <ProductCard />
        </Grid>
        <Grid item xs={4}>
          <ProductCard />
        </Grid>
      </Grid>
  );
};

export default Content;
