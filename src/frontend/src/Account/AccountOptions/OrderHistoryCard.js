import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  card: {
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
});

const OrderHistoryCard = (props) => {
  const classes = useStyles();

  const { ordernumber, date, delivery, scheduled, status, orderitems } = props;

  let arr = [];
  orderitems.map((item) => {
    return arr.push(parseFloat(item.total_price));
  });
  const total = arr.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );

  return (
    <Card>
      <Box className={classes.card}>
        <br></br>
        <Grid container justifyContent="center" className={classes.card}>
          <Grid item xs={12} container justifyContent="center">
            <Typography variant="overline">Order #{ordernumber}</Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Typography variant="overline">{date.substring(0, 10)}</Typography>
          </Grid>
        </Grid>
        <br></br>
      </Box>

      <Grid container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={4}>
          <List>
            <ListItem>
              <Typography variant="overline">
                Order Total: ${total.toFixed(2)}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="overline">Status: {status}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="overline">
                Method: {delivery > 0 ? `Delivery` : `Pickup`}
              </Typography>
            </ListItem>
            {scheduled !== "ASAP" && (
              <ListItem>
                {" "}
                <Typography variant="overline">
                  Scheduled: {scheduled}
                </Typography>
              </ListItem>
            )}
          </List>
        </Grid>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={6}>
          <Box>
            <ListItem>
              <List>
                <Typography variant="overline">Items:</Typography>
                {orderitems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemAvatar>
                      <Avatar alt="bakeshop" src={item.product.img} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="overline">{`${item.product.title} x ${item.quantity}`}</Typography>
                      }
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
