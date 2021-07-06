import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import logo from './Images/logo.png';
import cookies from './Images/cookies.jpeg';

const Content = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Cookies"
          subtitle="$49.99"
          avatarSrc={logo}
          imgSrc={cookies}
          description="A delicious batch of freshly made chocolate chip cookies"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Cookies"
          subtitle="$49.99"
          avatarSrc={logo}
          imgSrc={cookies}
          description="A delicious batch of freshly made chocolate chip cookies"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Cookies"
          subtitle="$49.99"
          avatarSrc={logo}
          imgSrc={cookies}
          description="A delicious batch of freshly made chocolate chip cookies"
        />
      </Grid>
    </Grid>
  );
};

export default Content;
