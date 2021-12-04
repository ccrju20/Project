import { React } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

const ContactForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log(errors);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
          <Controller
            name="firstname"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                error={!!errors.firstname}
                helperText={errors.firstname ? errors.firstname?.message : ""}
              />
            )}
          />
          <br />
          <br />
          <Controller
            name="lastname"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                error={!!errors.lastname}
                helperText={errors.lastname ? errors.lastname?.message : ""}
              />
            )}
          />
          <br />
          <br />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ""}
              />
            )}
          />
          <br />
          <br />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone?.message : ""}
              />
            )}
          />
          <br />
          <br />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default ContactForm;
