import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  card: {
    backgroundColor: "lightgrey",
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

  let arr = [];
  orderitems.map((item) => {
    arr.push(parseFloat(item.total_price));
  });
  const total = arr.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );

  return (
    <Card>
      <Box className={classes.card}>
        <br></br>
        <Typography variant="h6" align="center">
          Order #{ordernumber}
        </Typography>
        <Typography align="center">{date.substring(0, 10)}</Typography>
        <br></br>
      </Box>

      <Grid container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={4}>
          <List>
            <ListItem sx={{ fontWeight: "bold" }}>
              Order Total: ${total}
            </ListItem>
            <ListItem sx={{ fontWeight: "bold" }}>Status: {status}</ListItem>
            <ListItem>Method: {delivery > 0 ? `Delivery` : `Pickup`}</ListItem>
            {scheduled !== "ASAP" && (
              <ListItem> Scheduled: {scheduled}</ListItem>
            )}
          </List>
        </Grid>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={6}>
          <Box>
            <ListItem>
              <List>
                Items:
                {orderitems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemAvatar>
                      <Avatar alt="bakeshop" src={item.product.img} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${item.product.title} x ${item.quantity}`}
                      secondary={item.total_price}
                    ></ListItemText>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OrderHistoryCard;
