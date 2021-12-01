import React, { useState, useContext, useEffect } from "react";

import { Grid, Box, Typography } from "@material-ui/core";
import ServiceContext from "../service/service-context";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import OrderHistoryCard from "./OrderHistoryCard";

const useStyles = makeStyles({
  root: {
    height: "100px",
    width: "350px",
  },
});

const OrderHistory = (props) => {
  const serviceCtx = useContext(ServiceContext);
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    serviceCtx.getOrderHistory().then(
      (response) => {
        console.log(response.data);
        setData(response.data.reverse());
      },
      (error) => {
        console.log(error);
        // setData(error);
      }
    );
  }, []);

  return (
    <div>
      <Typography variant="body1">Order History</Typography>
      <Box mt={2}>
        {data.map((order) => (
          <Box mb={2} key={order.id}>
            <OrderHistoryCard
              key={order.id}
              ordernumber={order.ordernumber}
              date={order.dateposted}
              delivery={order.delivery}
              scheduled={order.scheduled}
              status={order.status}
              orderdetails={order.orderDetails}
              orderitems={order.orderItems}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default OrderHistory;
