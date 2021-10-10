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
    width: "80%",
    paddingTop: "10%",
    paddingBottom: "7%",
  },
  icon: {
    fontSize: "3em",
  },
  description: {
    marginTop: 10,
  },
  productname: {
  }
});

const CartProduct = (props) => {
  const classes = useStyles();
  const { name, price, image, amount } = props;

  const updatedPrice = `$${(price * amount).toFixed(2)}`;

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={4} sm={3}>
          <CardContent className={classes.content}>
            <CardMedia className={classes.media} image={image} />
          </CardContent>
        </Grid>
        <Grid item xs={8} sm={9} className={classes.description}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={3} className={classes.productname}>
              <Typography variant="h5" component="h2" className={classes.title}>
                {name} x {amount}{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container>
                <Grid item>
                  <IconButton onClick={props.onDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={props.onAdd}>
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={props.onRemove}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
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
