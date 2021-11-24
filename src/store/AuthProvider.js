import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./auth-context";

const LOGIN_REST_API_URL = "http://localhost:8080/api/auth/login";

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registerValues, setRegisterValues] = useState({});
  // const [loginCredentials, setLoginCredentials] = useState({});

  useEffect(() => {
    const storedUserLogin = localStorage.getItem("isLoggedIn");
    if (storedUserLogin === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    return axios
      .post(LOGIN_REST_API_URL, { username: email, password: password })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data)
        }
        return response.data;
      });

    // axios.post(ORDERS_REST_API_URL, DataObject).then((response) => {
    //   console.log(response.data.ordernumber);
    //   props.ordernumber(response.data.ordernumber);

    // localStorage.setItem("isLoggedIn", "1");
    // setIsLoggedIn(true);
  };

  const setLoginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const register = (obj) => {
    setRegisterValues(obj);
  };

  console.log(registerValues);

  const authContext = {
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    setLogin: setLoginHandler,
    onLogout: logoutHandler,
    register: register,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
