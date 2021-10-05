import { useState, useEffect } from "react";

const useForm = (submitForm, validate) => {
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
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [errors, isSubmitting, submitForm]);

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
