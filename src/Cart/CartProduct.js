import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 0,
  },
  content: {
    height: "30%",
  },
  media: {
    height: "120%",
    width: "100%",
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  icon: {
    fontSize: "3em",
  },
  description: {
    marginTop: 10,
  },
});

const CartProduct = (props) => {
  const classes = useStyles();
  const { name, price, image, amount } = props;

  const updatedPrice = `$${(price * amount).toFixed(2)}`;

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <CardContent className={classes.content}>
            <CardMedia className={classes.media} image={image} />
          </CardContent>
        </Grid>
        <Grid item xs={9} className={classes.description}>
          <Grid container>
              <Grid item xs={3}>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {name} x {amount}{" "}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <IconButton onClick={props.onDelete}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={props.onAdd}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={props.onRemove}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
          </Grid>
          <Typography
            component={"span"}
            className={classes.pos}
            color="textSecondary"
          >
            <p>Total: {updatedPrice}</p>
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartProduct;
