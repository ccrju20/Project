export default function validateInfo(values) {
  let errors = {};

  if (!values.firstname.trim()) {
    errors.firstname = "First name required";
  }

  if (!values.lastname.trim()) {
    errors.lastname = "Last name required";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.phone) {
    errors.phone = "Phone required";
  } else if (values.phone.length < 10) {
    errors.phone = "Phone is invalid";
  }

  if (!values.address.trim()) {
    errors.address = "Address required";
  }

  if (!values.city.trim()) {
    errors.city = "City required";
  }

  if (!values.state.trim()) {
    errors.state = "State required";
  }

  if (!values.postal.trim()) {
    errors.postal = "Postal required";
  }

  return errors;
}
