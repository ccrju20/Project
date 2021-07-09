import React from "react";
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

const useStyles = makeStyles({
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
});

const ProductCard = (props) => {
  const classes = useStyles();
  const {
    avatarSrc,
    id,
    title,
    subtitle,
    description,
    imgSrc,
    addToCart,
  } = props;

  const cartHandler = () => {
    console.log("added to cart");
    props.cartStatus(true);
  };

  const addThisToCart = () => {
    props.addToCart(title, subtitle, id, imgSrc);
  };

  return (
    <Card>
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
        <Button onClick={addThisToCart} size="small">
          Add to Cart
        </Button>
        <IconButton onClick={cartHandler}>
            <ShoppingBasketIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
