import { useState, useEffect, useContext } from "react";
import CartContext from "../store/cart-context";
import UserInfoContext from "../store/userinfo-context";

const useForm = (submitForm, validate) => {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserInfoContext);
  const [pickup, setPickup] = useState(false);

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

    setErrors(validate(values, pickup));

    setIsSubmitting(true);
  };

  const handlePickup = (boolean) => {
    setPickup(boolean);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
      // cartCtx.items.forEach((item) => {
      //   cartCtx.deleteItem(item.id);
      // });
      // post to orders table api backend
      if (pickup) {
        const valuesPickupOption = (({
          firstname,
          lastname,
          email,
          phone,
        }) => ({ firstname, lastname, email, phone }))(values);
        userCtx.saveInfo(valuesPickupOption);
      } else {
        userCtx.saveInfo(values);
      }
    }
  }, [errors, isSubmitting, submitForm]);

  return { handleChange, values, handleSubmit, errors, handlePickup };
};

export default useForm;
