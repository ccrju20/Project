import React from "react";

const ServiceContext = React.createContext({
  getOrderHistory: () => {},
  getUserInfo: () => {},
});

export default ServiceContext;
