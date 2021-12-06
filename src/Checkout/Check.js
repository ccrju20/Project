import { React } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ContactForm from './ContactForm'
import ShippingForm from './ShippingForm'
import { Grid } from "@material-ui/core";
import CheckoutCartList from './OrderSummary/CheckoutCartList'

const schema = yup
  .object()
  .shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().min(10).required(),
    //
    address: yup.string().required(),
    addresstwo: yup.string(),
    city: yup.string().required(),
    state: yup.string().min(2).required(),
    postal: yup.string().min(5).required(),
  })
  .required();

const Check = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <h3>Form</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
              <ContactForm />
              <br />
              <br />
              <ShippingForm />
            <input type="submit" />
          </form>
        </FormProvider>
        <CheckoutCartList/>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Check;
