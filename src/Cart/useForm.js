import { useState, useEffect, useContext } from "react";
import CartContext from "../store/cart-context";

const useForm = (submitForm, validate) => {
  const cartCtx = useContext(CartContext);

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

    cartCtx.items.forEach((item) => {
      cartCtx.deleteItem(item.id);
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [errors, isSubmitting, submitForm]);

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
