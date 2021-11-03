import { useState, useEffect, useContext } from "react";
import CartContext from "../store/cart-context";
import UserInfoContext from "../store/userinfo-context";

const useForm = (submitForm, validate, value) => {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserInfoContext);
  const [pickup, setPickup] = useState(false);
  // const [datetime, setDatetime] = useState(new Date());

  // useEffect(() => {
  //   const minDate = new Date();
  //   minDate.setDate(minDate.getDate() + 2);
  //   setDatetime(minDate);
  // }, []);

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    addresstwo: "",
    city: "",
    state: "",
    postal: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values, pickup));

    setIsSubmitting(true);
  };

  const handlePickup = (boolean) => {
    setPickup(boolean);
  };

  const handleDateTime = (val) => {
    console.log(val);

    setValues({ ...values, datetime: val });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();

      userCtx.saveInfo(values);
      console.log(values);

      // if (pickup) {
      //   const valuesPickupOption = (({
      //     firstname,
      //     lastname,
      //     email,
      //     phone,
      //     datetime,
      //   }) => ({ firstname, lastname, email, phone, datetime }))(values);
      //   userCtx.saveInfo(valuesPickupOption);
      //   console.log(valuesPickupOption);
      // } else {
      //   userCtx.saveInfo(values);
      //   console.log(values);
      // }
    }
  }, [errors, isSubmitting, submitForm, values]);

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
    handlePickup,
    handleDateTime,
  };
};

export default useForm;
