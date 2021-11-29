import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./auth-context";

const LOGIN_REST_API_URL = "http://localhost:8080/api/auth/login";
const REGISTER_REST_API_URL = "http://localhost:8080/api/auth/registration";

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          console.log(response.data);
        }
        return response.data;
      });
  };

  const setLoginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const register = (firstname, lastname, email, password) => {
    return axios
      .post(REGISTER_REST_API_URL, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        contactInfo: {
          email: email,
          phone: "",
          address: "",
          addresstwo: "",
          city: "",
          state: "",
          postal: ""
        }})
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data);
        }
        return response.data;
      });
  };

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
