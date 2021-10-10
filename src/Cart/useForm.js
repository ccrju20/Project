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
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
      cartCtx.items.forEach((item) => {
        cartCtx.deleteItem(item.id);
      });
      console.log(cartCtx.items);
      const timestamp = Date.now();
      console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
      // post to orders table api backend
    }
  }, [errors, isSubmitting, submitForm]);

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
