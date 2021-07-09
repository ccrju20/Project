import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import logo from "./Images/logo.png";
import cookies from "./Images/cookies.jpeg";

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
            cartStatus={props.cartStatus}
            addToCart={props.addToCart}
          />
        </Grid>
      ))}

      {/* <Grid item xs={12} sm={4}>
        <ProductCard
          key="123"
          title="Cookies"
          subtitle="$49.99"
          avatarSrc={logo}
          imgSrc={cookies}
          description="A delicious batch of freshly made chocolate chip cookies"
          cartStatus={props.cartStatus}
          addToCart={addToCart}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          key="124"
          title="Muffins"
          subtitle="$49.99"
          avatarSrc={logo}
          imgSrc={cookies}
          description="A delicious batch of freshly made chocolate chip cookies"
          cartStatus={props.cartStatus}
          addToCart={addToCart}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          key="125"
          title="Doughnuts"
          subtitle="$49.99"
          avatarSrc={logo}
          imgSrc={cookies}
          description="A delicious batch of freshly made chocolate chip cookies"
          cartStatus={props.cartStatus}
          addToCart={addToCart}
        />
      </Grid> */}
    </Grid>
  );
};

export default Content;
