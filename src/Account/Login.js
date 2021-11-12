import React, { useState } from "react";

import { Grid, Typography, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email, password);
  };

  return (
    <>
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
                required
              />
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
                required
              />
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

            <Grid item>
              <Link href="#" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default Login;
