import { React } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

const ContactForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                variant="outlined"
                error={!!errors.address}
                helperText={errors.address ? errors.address?.message : ""}
              />
            )}
          />
          <br />
          <br />
          <Controller
            name="addresstwo"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Address 2"
                variant="outlined"
                error={!!errors.addresstwo}
                helperText={errors.addresstwo ? errors.addresstwo?.message : ""}
              />
            )}
          />
          <br />
          <br />
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                variant="outlined"
                error={!!errors.city}
                helperText={errors.city ? errors.city?.message : ""}
              />
            )}
          />
          <br />
          <br />
          <Controller
            name="state"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="State"
                variant="outlined"
                error={!!errors.state}
                helperText={errors.state ? errors.state?.message : ""}
              />
            )}
          />
          <br />
          <br />
          <Controller
            name="postal"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Postal"
                variant="outlined"
                error={!!errors.postal}
                helperText={errors.postal ? errors.postal?.message : ""}
              />
            )}
          />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default ContactForm;
