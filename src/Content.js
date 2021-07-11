import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import logo from "./Images/logo.png";

const Content = (props) => {

  return (
    <Grid container spacing={4}>
      {props.products.map((product) => (
        <Grid item xs={12} sm={4} key={product.id}>
          <ProductCard
            id={product.id}
            title={product.name}
            subtitle={product.price}
            avatarSrc={logo}
            imgSrc={product.img}
            description={product.desc}
            addToCart={props.addToCart}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Content;
