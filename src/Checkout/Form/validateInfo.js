export default function validateInfo(values, pickup) {
  let errors = {};

  if (!values.firstname.trim()) {
    errors.firstname = "*First name required";
  }

  if (!values.lastname.trim()) {
    errors.lastname = "*Last name required";
  }

  if (!values.email) {
    errors.email = "*Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.phone) {
    errors.phone = "*Number required";
  } else if (values.phone.length < 10) {
    errors.phone = "Number is invalid";
  }

  if (!values.address.trim() && !pickup) {
    errors.address = "*Address required";
  }

  if (!values.city.trim() && !pickup) {
    errors.city = "*City required";
  }

  if (!values.state.trim() && !pickup) {
    errors.state = "*State required";
  }

  if (!values.postal.trim() && !pickup) {
    errors.postal = "*Postal required";
  }

  return errors;
}
