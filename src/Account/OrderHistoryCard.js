import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  card: {
    border: "grey"
  }
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
    <Card>
      <List>
        <ListItem>Order #{ordernumber}
        <Box ml={5}>{date}</Box>
        </ListItem>
        {/* <ListItem>Transaction made: {date}</ListItem> */}
        <ListItem>Delivery: {delivery}</ListItem>
        <ListItem>Scheduled: {scheduled}</ListItem>
        <ListItem>Status: {status}</ListItem>
        <ListItem>
          <List>
            Items:
            {orderitems.map((item) => (
              <ListItem key={item.id}>
                {item.product.title} x {item.quantity}
                <ListItemText> ~ ${item.total_price}</ListItemText>
              </ListItem>
            ))}
          </List>
        </ListItem>
      </List>
      {/* <ListItem>Total Price: {orderitems[0].product.title}</ListItem> */}
    </Card>
  );
};

export default OrderHistoryCard;
