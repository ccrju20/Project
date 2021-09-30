import { React, useContext, useState, useReducer, useEffect } from "react";

import { Grid } from "@material-ui/core";
import CartContext from "../store/cart-context";
import CartProduct from "./CartProduct";
import EnterInfo from "./EnterInfo";
import CartSandbox from "./CartSandbox";
import CheckoutCartList from "./CheckoutCartList";

const FinalCart = () => {
  const cartCtx = useContext(CartContext);
  // const [userInfo, setUserInfo] = useState([]);
  // const [enteredFirstName, setEnteredFirstName] = useState("");
  // const [enteredLastName, setEnteredLastName] = useState("");
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredNumber, setEnteredNumber] = useState("");

  // // validation
  // const [firstNameValidError, setFirstNameError] = useState(false);
  // const [lastNameValidError, setLastNameError] = useState(false);
  // const [emailValidError, setEmailError] = useState(false);
  // const [numberValidError, setNumberError] = useState(false);

  // const firstNameChangeHandler = (e) => {
  //   setEnteredFirstName(e.target.value);
  // };

  // const lastNameChangeHandler = (e) => {
  //   setEnteredLastName(e.target.value);
  // };

  // const emailChangeHandler = (e) => {
  //   setEnteredEmail(e.target.value);
  // };

  // const numberChangeHandler = (e) => {
  //   setEnteredNumber(e.target.value);
  // }

  // const checkValidity = () => {
  //   if (enteredFirstName === "") {
  //     setFirstNameError(true);
  //   }

  //   if (enteredLastName === "") {
  //     setLastNameError(true);
  //   }

  //   if (enteredEmail === "" || !enteredEmail.includes("@")) {
  //     setEmailError(true);
  //   }

  //   if (enteredNumber === "" || enteredNumber.length < 10) {
  //     setNumberError(true);
  //   }
  // };

  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   setFirstNameError(false);
  //   setLastNameError(false);
  //   setEmailError(false);
  //   setEnteredNumber(false);

  //   if (enteredFirstName && enteredLastName && enteredEmail && enteredNumber) {
  //     setUserInfo([
  //       {
  //         firstName: enteredFirstName,
  //         lastName: enteredLastName,
  //         email: enteredEmail,
  //         number: enteredNumber
  //       },
  //     ]);
  //     console.log(userInfo);
  //     console.log("form is valid");
  //   } else {
  //     checkValidity();
  //     console.log("form is not valid");
  //   }

  //   console.log(enteredNumber.length);

  //   /*
  //     1. Post cart items to orders table api endpoint
  //     2. Post user info to users table api endpoint
  //   */
  // };

  // return <CartSandbox />;
  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <h1> Checkout </h1>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <EnterInfo />
          </Grid>
          <Grid item xs={12} sm={4}>
            <h3>Items in your cart</h3>
            <CheckoutCartList />
            {/* {cartCtx.items.map((product) => (
              <CartProduct
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.img}
                amount={product.amount}
              />
            ))} */}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default FinalCart;
