import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../store/auth-context.js";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Register = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTwoError, setPasswordTwoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstnameError, setFirstNameError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const passwordTwoChangeHandler = (event) => {
    setPasswordTwo(event.target.value);
  };

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  function validate() {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setPasswordTwoError("");

    if (!firstname.trim()) {
      setFirstNameError("*First Name required");
    }

    if (!lastname.trim()) {
      setLastNameError("*Last Name required");
    }

    if (!email) {
      setEmailError("*Email required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("*Email address is invalid");
    }

    if (!password.trim()) {
      setPasswordError("*Password required");
    } else if (password.length < 7) {
      setPasswordError("*Password must contain at least 7 characters");
    }

    if (!passwordTwo.trim()) {
      setPasswordTwoError("*Re-Enter Password required");
    } else if (password !== passwordTwo) {
      setPasswordTwoError("*Passwords do not match");
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    validate();
    setErrorMessage("");
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setLoggedIn(true);
    }

    if (
      !emailError &&
      !passwordError &&
      !passwordTwoError &&
      !firstnameError &&
      !lastnameError &&
      isSubmitting
    ) {
      authCtx.register(firstname, lastname, email, password).then(
        () => {
          authCtx.setLogin();
          navigate("/success");
        },
        (error) => {
          console.log(error.response);
          if (error.response.data.includes("Email already taken")) {
            setErrorMessage("Email already taken");
          } else {
            setErrorMessage(error.response.data.message);
          }
          setIsSubmitting(false);
        }
      );
    }
  }, [
    emailError,
    passwordError,
    passwordTwoError,
    firstnameError,
    lastnameError,
    isSubmitting,
  ]);

  return (
    <Container maxWidth="xs">
      {loggedIn && (
        <>
          <Box mt={2} textAlign="center">
            <Typography align="center" variant="subtitle2">
              Please log out before creating a new account
            </Typography>
            <Button
              onClick={() => {
                authCtx.onLogout();
                window.location.reload();
              }}
              variant="contained"
              type="submit"
              size="small"
              sx={{
                backgroundColor: "#41166c",
                "&:hover": {
                  backgroundColor: "#290052",
                },
                marginTop: 2,
              }}
            >
              Logout
            </Button>
          </Box>
        </>
      )}
      <Box mt={7} mb={3}>
        <Typography align="center" variant="h5">
          Create Account
        </Typography>
      </Box>
      <Box mb={2}>
        {errorMessage && (
          <Typography align="center" color="error" variant="subtitle2">
            {errorMessage}
          </Typography>
        )}
      </Box>
      <form onSubmit={submitHandler}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TextField
              fullWidth
              id="firstname"
              variant="outlined"
              label="First Name"
              name="firstname"
              value={firstname}
              onChange={firstNameChangeHandler}
            />
            {firstnameError && (
              <Typography color="error" variant="subtitle2">
                {firstnameError}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="lastname"
              variant="outlined"
              label="Last Name"
              name="lastname"
              value={lastname}
              onChange={lastNameChangeHandler}
            />
            {lastnameError && (
              <Typography color="error" variant="subtitle2">
                {lastnameError}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="email"
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={emailChangeHandler}
            />
            {emailError && (
              <Typography color="error" variant="subtitle2">
                {emailError}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="password"
              type="password"
              variant="outlined"
              label="Password"
              name="password"
              value={password}
              onChange={passwordChangeHandler}
            />
            {passwordError && (
              <Typography color="error" variant="subtitle2">
                {passwordError}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="passwordtwo"
              type="password"
              variant="outlined"
              label="Confirm Password"
              name="passwordtwo"
              value={passwordTwo}
              onChange={passwordTwoChangeHandler}
            />
            {passwordTwoError && (
              <Typography color="error" variant="subtitle2">
                {passwordTwoError}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#41166c",
                "&:hover": {
                  backgroundColor: "#290052",
                },
              }}
              disabled={loggedIn}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mb={10}></Box>
    </Container>
  );
};

export default Register;
