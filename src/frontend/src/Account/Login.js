import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../store/auth-context.js";
import { Grid, Typography, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Login = (props) => {
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  function validate() {
    setEmailError("");
    setPasswordError("");

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
  }

  const submitHandler = (event) => {
    event.preventDefault();
    validate();
    setErrorMessage("");
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!emailError && !passwordError && isSubmitting) {
      authCtx.onLogin(email, password).then(
        () => {
          authCtx.setLogin();
        },
        (error) => {
          console.log(error.response);
          if (error.response.data.message.includes("Access Denied")) {
            setErrorMessage("Invalid Username or Password");
          } else {
            setErrorMessage(error.response.data.message)
          }
          setIsSubmitting(false);
        }
      );
    }
  }, [emailError, passwordError, isSubmitting]);

  return (
    <Container maxWidth="xs">
      <Box mt={7} mb={3} mr={5}>
        <Typography align="center" variant="h5">
          <AccountCircleOutlinedIcon
            sx={{ marginRight: 2, marginBottom: -1 }}
            fontSize="large"
          />
          Login
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
              data-cy="login-submit"
            >
              Submit
            </Button>
          </Grid>

          <Grid item>
            <Link href="#" variant="body2">
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
