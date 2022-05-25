import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import ProductDetails from "./ProductDetails";
import Button from "@mui/material/Button";
import CartContext from "../store/cart-context";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import RemoveCircleOutlineTwoToneIcon from "@mui/icons-material/RemoveCircleOutlineTwoTone";
import IconButton from "@material-ui/core/IconButton";
import SnackbarAlert from "../Cart/SnackbarAlert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [itemAmount, setItemAmount] = useState(1);
  const [open, setOpen] = useState(false);
  const cartCtx = useContext(CartContext);
  const [price, setPrice] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [productId, setProductId] = useState();
  const [productOptionsId, setProductOptionsId] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    const productItem = JSON.parse(localStorage.getItem("product"));
    setProduct(productItem);
    setName(productItem.title);
    setPrice(productItem.price);
    setProductId(productItem.id);
    setProductOptionsId(productItem.options[0].id);
    if (productItem.options.length > 1) {
      setProductOptions(productItem.options);
    }
  }, []);

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: productId,
      option: productOptionsId,
      name: name,
      amount: itemAmount,
      price: parseFloat(price),
      img: product.img,
    });
    setOpen(true);
  };

  const handleItemRemove = () => {
    if (itemAmount !== 1) {
      setItemAmount((curr) => curr - 1);
    }
  };

  const handleItemAdd = () => {
    setItemAmount((curr) => curr + 1);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleOption = (event) => {
    setSelectedOption(event.target.value);
    setProductOptionsId(event.target.value);
    const result = productOptions.filter(
      (option) => option.id === event.target.value
    );
    product.category === "Cake"
      ? setName(`${product.title} ${result[0].size}"`)
      : setName(`${product.title} size ${result[0].size}`);
    setPrice(result[0].price);
  };

  // console.log(cartCtx.items);
  // console.log(itemAmount);

  const options = productOptions.map((productOption) => (
    <MenuItem value={productOption.id} key={productOption.id}>
      {productOption.size}
      {product.category === "Cake" ? `" Cake` : <> {product.category}(s)</>}
    </MenuItem>
  ));

  return (
    <>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Box mt={5} mb={5}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                to="/shop"
                component={RouterLink}
              >
                Shop
              </Link>
              <Typography>{product.category}</Typography>
              <Typography style={{ color: "#000000" }}>
                {product.title}
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box mb={5}>
            <Grid container>
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
                <Typography variant="h5">${price}</Typography>

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

                {productOptions.length > 1 && (
                  <Box mt={2}>
                    <FormControl fullWidth>
                      <InputLabel>Select Size</InputLabel>
                      <Select
                        value={selectedOption}
                        label="Select Size"
                        onChange={(event) => {
                          handleOption(event);
                        }}
                      >
                        {options}
                      </Select>
                    </FormControl>
                  </Box>
                )}

                <Box mt={3}>
                  <ProductDetails description={product.description} />
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
                  <SnackbarAlert
                    open={open}
                    close={handleClose}
                    severity="success"
                    message="Added to Cart!"
                  />
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
