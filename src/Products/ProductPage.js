import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import ProductDetails from "./ProductDetails";
import Button from "@mui/material/Button";

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
            <Typography sx={{ fontSize: 18 }}>
              Baked Goods > Category
            </Typography>
          </Box>

          <Box mb={5}>
            <Grid container>
              {/* <Grid item xs={false} sm={2} /> */}
              <Grid item xs={12} sm={7}>
                <Card>
                  <CardMedia
                    height={350}
                    component="img"
                    image={product.img}
                    alt="item"
                  />
                </Card>
              </Grid>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={4}>
                <Typography variant="h3">{product.title}</Typography>
                <Typography variant="h5">${product.price}</Typography>
                <Typography sx={{ fontSize: 18 }}>
                  {product.description}
                </Typography>
                <Box mt={3}>
                  <ProductDetails />
                </Box>
                <Box mt={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                      backgroundColor: "#41166c",
                      "&:hover": {
                        backgroundColor: "#290052",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
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
