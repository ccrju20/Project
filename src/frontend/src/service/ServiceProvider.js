import { React } from "react";
import axios from "axios";
import authHeader from "./authHeader";
import ServiceContext from "./service-context";

const ORDERS_REST_API_URL = "api/v1/orders/account/";
const USERINFO_REST_API_URL = "api/v1/auth/contactinfo/";

const ServiceProvider = (props) => {

  const getOrderHistory = () => {
    const id = JSON.parse(localStorage.getItem("user")).theId;
    return axios.get(ORDERS_REST_API_URL + id, { headers: authHeader() });
  };

  const getUserInfo = () => {
    const id = JSON.parse(localStorage.getItem("user")).theId;
    return axios.get(USERINFO_REST_API_URL + id, { headers: authHeader() });
  };

  const serviceContext = {
    getOrderHistory: getOrderHistory,
    getUserInfo: getUserInfo,
  };

  return (
    <ServiceContext.Provider value={serviceContext}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
