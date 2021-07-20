import React, { useState } from "react";

import { Grid } from "@material-ui/core";

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <label>Email </label>
            <input type="email" value={email} onChange={emailChangeHandler} required></input> <p></p>
            <label>Password </label>
            <input type="password" value={password} onChange={passwordChangeHandler} required></input>
            <p></p><button>Submit</button>
          </form>
          <p></p>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
};

export default Login;