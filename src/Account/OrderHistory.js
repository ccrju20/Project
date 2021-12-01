import React, { useState, useContext, useEffect } from "react";

import { Box, Typography } from "@material-ui/core";
import ServiceContext from "../service/service-context";
import OrderHistoryCard from "./OrderHistoryCard";

const OrderHistory = (props) => {
  const serviceCtx = useContext(ServiceContext);
  const [data, setData] = useState([]);

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
  }, [serviceCtx]);

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
