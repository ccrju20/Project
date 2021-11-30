import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
  root: {
    width: 275,
  },
});

const OrderHistoryCard = (props) => {
  const classes = useStyles();

  const {
    ordernumber,
    date,
    delivery,
    scheduled,
    status,
    orderdetails,
    orderitems,
  } = props;

  return (
    // <Grid container>
        <Card>
          <ListItem>Order #{ordernumber}</ListItem>
          <ListItem>Transaction made: {date}</ListItem>
          <ListItem>Delivery: {delivery}</ListItem>
          <ListItem>Scheduled: {scheduled}</ListItem>
          <ListItem>Status: {status}</ListItem>
        </Card>
    // </Grid>
  );
};

export default OrderHistoryCard;
