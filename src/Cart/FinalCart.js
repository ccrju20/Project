import { React, useContext, useState, useReducer, useEffect } from "react";
import { Grid } from "@material-ui/core";
import CartContext from "../store/cart-context";
import CartProduct from "./CartProduct";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "30ch",
  },
  accordionRoot: {
    width: "80%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    border: "3px solid",
    width: "180px",
    color: "#837D7D",
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="+1 (###) ###-####"
      mask="_"
    />
  );
}

const FinalCart = () => {
  const cartCtx = useContext(CartContext);
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState([]);
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");

  // validation
  const [firstNameValidError, setFirstNameError] = useState(false);
  const [lastNameValidError, setLastNameError] = useState(false);
  const [emailValidError, setEmailError] = useState(false);


  const firstNameChangeHandler = (e) => {
    setEnteredFirstName(e.target.value);
  };

  const lastNameChangeHandler = (e) => {
    setEnteredLastName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const checkValidity = () => {
    if (enteredFirstName === "") {
      setFirstNameError(true);
    }

    if (enteredLastName === "") {
      setLastNameError(true);
    }

    if (enteredEmail === "" || !enteredEmail.includes("@")) {
      setEmailError(true);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);

    if (enteredFirstName && enteredLastName && enteredEmail) {
      setUserInfo([
        {
          firstName: enteredFirstName,
          lastName: enteredLastName,
          email: enteredEmail,
        },
      ]);
      console.log(userInfo);
      console.log("form is valid");
    } else {
      checkValidity();
      console.log("form is not valid");
    }

    /* 
      1. Post cart items to orders table api endpoint 
      2. Post user info to users table api endpoint
    */
  };

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <h1> Checkout </h1>
        <Grid container>
          <Grid item xs={8}>
            <h3>Please enter your info </h3>
            <div className={classes.accordionRoot}>
              <form onSubmit={onSubmitHandler}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>Name</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.root}>
                    <TextField
                      id="standard-basic"
                      label="First Name"
                      value={enteredFirstName}
                      onChange={firstNameChangeHandler}
                      error={firstNameValidError}
                    />
                    <TextField
                      id="standard-basic"
                      label="Last Name"
                      value={enteredLastName}
                      onChange={lastNameChangeHandler}
                      error={lastNameValidError}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={classes.heading}>
                      Contact Info
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.root}>
                    <TextField
                      id="standard-basic"
                      type="email"
                      label="Email"
                      value={enteredEmail}
                      onChange={emailChangeHandler}
                      error={emailValidError}
                    />
                    <TextField
                      label="Phone"
                      name="numberformat"
                      id="formatted-numberformat-input"
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Shipping Address
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      className={classes.textField}
                      label="Address"
                      id="standard-basic"
                    />
                  </AccordionDetails>
                </Accordion>
                <br></br>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  type="submit"
                >
                  Order
                </Button>
              </form>
            </div>
          </Grid>
          <Grid item xs={4}>
            {cartCtx.items.map((product) => (
              <CartProduct
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.img}
                amount={product.amount}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default FinalCart;
