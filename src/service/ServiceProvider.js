import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "./authHeader";
import ServiceContext from "./service-context";

const ORDERS_REST_API_URL = "http://localhost:8080/api/orders/account/";

const ServiceProvider = (props) => {
  const getOrderHistory = () => {
    const id = JSON.parse(localStorage.getItem("user")).theId;
    console.log(id);
    return axios.get(ORDERS_REST_API_URL + id, { headers: authHeader() });
  };

  const serviceContext = {
    getOrderHistory: getOrderHistory,
  };

  return (
    <ServiceContext.Provider value={serviceContext}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
