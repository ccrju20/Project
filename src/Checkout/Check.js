import { React, useState, useContext, useEffect } from "react";
import UserInfoContext from "../store/userinfo-context";
import CartContext from "../store/cart-context";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ContactForm from "./Form/ContactForm";
import ShippingForm from "./Form/ShippingForm";
import ScheduleForm from "./Form/ScheduleForm";
import PaymentPage from "./PaymentPage";
import { Grid, Box, Typography, Toolbar } from "@material-ui/core";
import CheckoutCartList from "./OrderSummary/CheckoutCartList";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import Divider from "@mui/material/Divider";

import Checkout from "./Checkout";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ConfirmInfo from "./ConfirmInfo";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// const schema = yup
//   .object()
//   .shape({
//     firstname: yup.string().required(),
//     lastname: yup.string().required(),
//     email: yup.string().email().required(),
//     phone: yup.string().min(10).required(),
//     //
//     pickup: yup.boolean().required(),
//     address: yup
//       .string()
//       .when("pickup", { is: false, then: yup.string().required() }),
//     addresstwo: yup.string(),
//     city: yup
//       .string()
//       .when("pickup", { is: false, then: yup.string().required() }),
//     state: yup
//       .string()
//       .when("pickup", { is: false, then: yup.string().min(2).required() }),
//     postal: yup
//       .string()
//       .when("pickup", { is: false, then: yup.string().min(5).required() }),
//   })
//   .required();

const steps = ["Enter Information ", "Review and Confirm"];

const Check = () => {
  const [activeStep, setActiveStep] = useState(0);

  const placeOrder = () => {
    setActiveStep(activeStep + 1);

  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const navigate = useNavigate();
  const userCtx = useContext(UserInfoContext);
  // const methods = useForm({
  //   resolver: yupResolver(schema),
  // });
  const onSubmit = (data) => {
    console.log(data);
    userCtx.saveInfo(data);
    // navigate("/confirminfo");
    // navigate("/payment");
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Checkout handleNext={handleNext} />;
      case 1:
        return <PaymentPage handleNext={handleNext} />;
      // case 2:
      //   return <ConfirmInfo />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <Toolbar>
        <Grid container justifyContent="center">
          <Logo />
        </Grid>
      </Toolbar>

      {/* <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}> */}
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Box mb={2}>
            <Divider variant="middle" />
          </Box>

          {/* <Checkout /> */}
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  {activeStep > 0 && (
                    <>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          sx={{
                            backgroundColor: "#290052",
                            "&:hover": {
                              backgroundColor: "#430085",
                            },
                          }}
                          variant="contained"
                          onClick={placeOrder}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          Place Order
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          Next
                        </Button>
                      )}
                    </>
                  )}
                </Box>
              </>
            )}
          </>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Box mb={50}></Box>
      {/* </form>
      </FormProvider> */}
    </>
  );
};

export default Check;
