import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import CartContext from "../store/cart-context";

const useStyles = makeStyles({
  root: {
    height: "360px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    height: "150px",
  },
  button: {
    marginBottom: -50,
  },
});

const ProductCard = (props) => {
  const classes = useStyles();
  const { avatarSrc, id, title, subtitle, description, imgSrc } = props;
  const cartCtx = useContext(CartContext);

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.title,
      amount: 1,
      price: parseFloat(props.subtitle),
      img: props.imgSrc,
    });
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={avatarSrc} />}
        action={
          <IconButton aria-label="settings">
            <ShareIcon />
          </IconButton>
        }
        title={title}
        subheader={"$" + subtitle}
        key={id}
      />
      <CardMedia className={classes.image} image={imgSrc} />
      <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          onClick={addToCartHandler}
          size="small"
        >
          + Add
        </Button>

        <IconButton className={classes.button}>
          <Link component={RouterLink} to="/cart" color="inherit">
            <ShoppingBasketIcon />
          </Link>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
