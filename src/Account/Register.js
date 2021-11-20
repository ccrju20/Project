import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { Grid, Typography, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");


  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTwoError, setPasswordTwoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const passwordTwoChangeHandler = (event) => {
    setPasswordTwo(event.target.value);
  };

  function validate() {
    setEmailError("");
    setPasswordError("");
    setPasswordTwoError("");

    if (!email) {
      setEmailError("*Email required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("*Email address is invalid");
    }

    if (password !== passwordTwo) {
        setPasswordTwoError("*Passwords do not match");
    }

    if (!password.trim()) {
      setPasswordError("*Password required");
    } else if (password.length < 7) {
      setPasswordError("*Password must contain at least 7 characters");
    }

    if (!passwordTwo.trim()) {
        setPasswordTwoError("*Re-Enter Password required");
      } else if (passwordError) {
        setPasswordTwoError("*Passwords do not match");
      }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    validate();

    setIsSubmitting((true));
  };

  useEffect(() => {
    if (!emailError && !passwordError && !passwordTwoError && isSubmitting) {
      console.log("success");
      props.signUpStatus(email, password);
      history.push('/success');
    }
  }, [emailError, passwordError, passwordTwoError, isSubmitting]);

  return (
    <Container maxWidth="xs">
      <Box mt={7} mb={3} mr={5}>
        <Typography align="center" variant="h5">
          <AccountCircleOutlinedIcon
            sx={{ marginRight: 2, marginBottom: -1 }}
            fontSize="large"
          />
          Sign Up
        </Typography>
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
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
