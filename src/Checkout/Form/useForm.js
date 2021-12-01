import { useState, useEffect, useContext } from "react";
import UserInfoContext from "../../store/userinfo-context";

const useForm = (submitForm, validate, value) => {
  const userCtx = useContext(UserInfoContext);
  const [pickup, setPickup] = useState(false);
  // const [datetime, setDatetime] = useState(new Date());

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
    datetime: "ASAP",
    pickup: pickup
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values, pickup));

    setIsSubmitting(true);
  };

  const handlePickup = (boolean) => {
    setValues({...values, pickup: boolean})
    setPickup(boolean);
  };

  const handleAsap = (val, date) => {
    if (val === "ASAP") {
          setValues({...values, datetime: "ASAP"})
    } else {
      handleDateTime(date)
    }
  }

  const handleDateTime = (val) => {
    console.log(val);
    setValues({ ...values, datetime: val });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
      
      userCtx.saveInfo(values);
      console.log(values);
    }
  }, [errors, isSubmitting, submitForm, values, userCtx]);

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
    handlePickup,
    handleDateTime,
    handleAsap
  };
};

export default useForm;
