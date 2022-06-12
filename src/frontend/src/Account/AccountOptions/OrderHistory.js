import React, { useState, useContext, useEffect } from "react";

import { Grid, Box, Typography } from "@material-ui/core";
import ServiceContext from "../../service/service-context";
import OrderHistoryCard from "./OrderHistoryCard";
import CircularProgress from "@mui/material/CircularProgress";

const OrderHistory = (props) => {
  const serviceCtx = useContext(ServiceContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    serviceCtx.getOrderHistory().then(
      (response) => {
        setData(response.data.reverse());
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        // setData(error);
      }
    );
  }, [serviceCtx]);

  return (
    <>
      {isLoading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Typography variant="h5" align="center">
            Order History
          </Typography>
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
        </>
      )}
    </>
  );
};

export default OrderHistory;
