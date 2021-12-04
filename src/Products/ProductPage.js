import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import ProductDetails from "./ProductDetails";
import Button from "@mui/material/Button";
import CartContext from "../store/cart-context";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import RemoveCircleOutlineTwoToneIcon from "@mui/icons-material/RemoveCircleOutlineTwoTone";
import IconButton from "@material-ui/core/IconButton";


const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [itemAmount, setItemAmount] = useState(1);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem("product")));
  }, []);

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: product.id,
      name: product.title,
      amount: itemAmount,
      price: parseFloat(product.price),
      img: product.img,
    });
  };

  const handleItemRemove = () => {
    if (itemAmount !== 1) {
      setItemAmount((curr) => curr - 1);
    }
  };

  const handleItemAdd = () => {
    setItemAmount((curr) => curr + 1);
  };

  console.log(cartCtx.items);
  console.log(itemAmount);

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
              {/* <Grid item xs={false} sm={1} /> */}
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardMedia
                    height={375}
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

                <Grid container>
                  <Grid item>
                    <IconButton onClick={handleItemRemove}>
                      <RemoveCircleOutlineTwoToneIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" style={{ margin: 8 }}>
                      {itemAmount}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleItemAdd}>
                      <AddCircleOutlineTwoToneIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                <Box mt={3}>
                  <ProductDetails />
                </Box>
                <Box mt={3}>
                  <Button
                    onClick={addToCartHandler}
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
