import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CartContext from "../store/cart-context";
import SnackbarAlert from "../Cart/SnackbarAlert";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    fontSize: 16,
  },
  button: {
    marginTop: -10,
  },
  description: {
    marginTop: -20,
  },
});

const ProductCard = (props) => {
  const classes = useStyles();
  const { id, title, subtitle, description, imgSrc } = props;
  const cartCtx = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.title,
      amount: 1,
      price: parseFloat(props.subtitle),
      img: props.imgSrc,
    });

    setOpen(true);
  };

  const handleProduct = (id, title, subtitle, description, imgSrc) => {
    console.log("clicked");
    localStorage.setItem(
      "product",
      JSON.stringify({
        id: id,
        title: title,
        price: subtitle,
        description: description,
        img: imgSrc,
      })
    );
    navigate("/product");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          handleProduct(id, title, subtitle, description, imgSrc);
        }}
      >
        <CardMedia height={180} component="img" image={imgSrc} alt="item" />
        <CardHeader
          classes={{ title: classes.title }}
          title={title}
          subheader={"$" + subtitle}
          key={id}
        />
        {/* <CardContent className={classes.description}>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent> */}
      </CardActionArea>
      <CardActions>
        <Button
          className={classes.button}
          onClick={addToCartHandler}
          size="small"
        >
          + Add
        </Button>
        <SnackbarAlert
          open={open}
          close={handleClose}
          severity="success"
          message="Added to Cart!"
        />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
