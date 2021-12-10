import { React, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CartContext from "../store/cart-context";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import SnackbarAlert from "../Cart/SnackbarAlert";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: 0,
    marginTop: 5,
    marginLeft: 5,
  },
  cardAction: {
    padding: 0,
    marginTop: 5,
  },
}));

const CartCheck = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2).replace("-0", "0")}`;
  const classes = useStyles();
  const { name, price, image, amount } = props;
  const [itemAmount, setItemAmount] = useState(amount);
  const [removeLimit, setRemoveLimit] = useState(false);

  const handleRemove = () => {
    if (itemAmount !== 1) {
      setItemAmount((curr) => curr - 1);
    }
  };

  const handleAdd = () => {
    setItemAmount((curr) => curr + 1);
  };

  const handleUpdate = () => {
    const diff = itemAmount - amount;
    console.log(diff);
    props.onAdd(diff);
  };

  const cartTotalItems = cartCtx.items.length;

  return (
    <>
      <Grid item xs={12} >
        <Card>
          <Grid container>
            <Grid item xs={3}>
              <CardMedia
                component="img"
                height="80"
                sx={{ width: "100%" }}
                image={image}
                alt="product"
              />
            </Grid>

            <Grid item xs={3}>
              <CardHeader
                titleTypographyProps={{ variant: "body1" }}
                className={classes.cardContent}
                title={name}
                sx={{ padding: "0px" }}
                subheader={`$${(price * amount).toFixed(2)}`}
              />
            </Grid>

            <Grid item xs={3}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <IconButton
                    className={classes.cardAction}
                    onClick={handleAdd}
                  >
                    <ArrowDropUpIcon />
                  </IconButton>
                </Grid>
                {itemAmount}
                <Grid item>
                  <IconButton
                    className={classes.cardAction}
                    onClick={handleRemove}
                  >
                    <ArrowDropDownIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Box >
                <IconButton onClick={props.onDelete}>
                  <DeleteIcon />
                </IconButton>
                <Button
                  onClick={handleUpdate}
                  variant="text"
                  type="submit"
                  style={{
                    color: "blue",
                    padding: 0,
                  }}
                >
                  Update
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default CartCheck;
