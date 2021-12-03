import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@material-ui/core";

const ProductPage = () => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem("product")));
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Box mt={5} mb={5}>
            {/* <Typography variant="h5">{product.title}</Typography> */}
            <Typography sx={{ fontSize: 18}}>Baked Goods > Category</Typography>
          </Box>

          <Box mb={5}>
            <Grid container>
              <Grid item xs={2} />
              <Grid item xs={7}>
                <img
                  style={{ height: "425px", width: "450px" }}
                  alt="product"
                  src={product.img}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h3">{product.title}</Typography>
                <Typography variant="h5">${product.price}</Typography>
                <Typography sx={{ fontSize: 18}}>{product.description}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
};

export default ProductPage;
