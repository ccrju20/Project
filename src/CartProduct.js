import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 0,
  },
  media: {
    height: 0,
    // marginLeft: 50,
    paddingTop: "30%", // 16:9
    paddingBottom: "10%",
  },
  icon: {
    fontSize: "3em",
  },
});

const CartProduct = (props) => {
  const classes = useStyles();
  const { id, name, price, updatedPrice, image, qt } = props;

  const onDeleteHandler = () => {
    console.log(id)
    props.onDelete(id);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography
          component={"span"}
          className={classes.pos}
          color="textSecondary"
        >
          ${price} ~ Qt: {qt} <p>Total: ${updatedPrice}</p>
        </Typography>
      </CardContent>
      <CardMedia className={classes.media} image={image} />
      <CardActions>
        <IconButton onClick={onDeleteHandler}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CartProduct;
