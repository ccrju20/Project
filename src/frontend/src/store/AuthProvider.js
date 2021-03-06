import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./auth-context";

const LOGIN_REST_API_URL = "api/v1/auth/login";
const REGISTER_REST_API_URL = "api/v1/auth/registration";

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        email: email,
        password: password,
        contactInfo: {
          firstname: firstname,
          lastname: lastname,
          phone: "",
          address: "",
          addresstwo: "",
          city: "",
          state: "",
          postal: "",
        },
      })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response);
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
