import { React, useState, useContext, useEffect } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import ContactForm from "./Form/ContactForm";
import ShippingForm from "./Form/ShippingForm";
import ScheduleForm from "./Form/ScheduleForm";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CheckoutCartList from "./OrderSummary/CheckoutCartList";

import * as yup from "yup";
import UserInfoContext from "../store/userinfo-context";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object()
  .shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().min(10).required(),
    //
    pickup: yup.boolean().required(),
    address: yup
      .string()
      .when("pickup", { is: false, then: yup.string().required() }),
    addresstwo: yup.string(),
    city: yup
      .string()
      .when("pickup", { is: false, then: yup.string().required() }),
    state: yup
      .string()
      .when("pickup", { is: false, then: yup.string().min(2).required() }),
    postal: yup
      .string()
      .when("pickup", { is: false, then: yup.string().min(5).required() }),
  })
  .required();

const Checkout = (props) => {
  const userCtx = useContext(UserInfoContext);
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    userCtx.saveInfo(data);
    props.handleNext();
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} sm={12} md={7}>
              <Box mt={2} mb={3}>
                <Typography variant="h4">Checkout</Typography>
                <Typography variant="subtitle1">
                  Please enter your information below
                </Typography>
              </Box>

              <ContactForm />
              <br />
              <br />
              <ShippingForm />
              <br />
              <br />
              <ScheduleForm />
              <br />
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={1} />
            <Grid item xs={12} sm={12} md={4}>
              <Box mt={3}>
                <CheckoutCartList />
              </Box>
              <Box mt={5}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: "#290052",
                    "&:hover": {
                      backgroundColor: "#430085",
                    },
                  }}
                >
                  Continue to Payment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default Checkout;
