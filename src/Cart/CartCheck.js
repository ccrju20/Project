import { React, useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: 0,
    marginTop: 10,
    marginLeft: 20,
  },
  cardAction: {
    padding: 0,
    marginTop: 5,
  },
}));

const CartCheck = (props) => {
  const classes = useStyles();
  const { name, price, image, amount } = props;

  return (
    <>
      <Grid item xs={12}>
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

            <Grid item xs={6}>
              <CardHeader
                titleTypographyProps={{ variant: "body1" }}
                className={classes.cardContent}
                title={`${name} (${amount})`}
                sx={{ padding: "0px" }}
                subheader={`$${(price).toFixed(2)}`}
              />
            </Grid>

            <Grid item xs={3}>
              <Box mt={2}>
                <IconButton onClick={props.onDelete}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <br />
      </Grid>
    </>
  );
};

export default CartCheck;
