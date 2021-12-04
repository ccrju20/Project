import { Grid, Box, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import useForm from "./useForm";
import validate from "./validateInfo";

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

const Contact = () => {
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
  } = useForm(validate);

  return (
    <>
      <h3>Please enter your info </h3>
      {/* <form onSubmit={handleSubmit}> */}
        <Card>
          <CardHeader title="Contact Info" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstname"
                  variant="filled"
                  label="First Name"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <Typography color="error" variant="subtitle2">
                    {errors.firstname}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastname"
                  variant="filled"
                  label="Last Name"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <Typography color="error" variant="subtitle2">
                    {errors.lastname}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  variant="filled"
                  label="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <Typography color="error" variant="subtitle2">
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phone"
                  variant="filled"
                  label="Phone"
                  name="phone"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  value={values.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <Typography color="error" variant="subtitle2">
                    {errors.phone}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      {/* </form> */}
    </>
  );
};

export default Contact;
