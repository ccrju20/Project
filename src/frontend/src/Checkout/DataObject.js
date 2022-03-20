import { useState, useEffect, useContext } from "react";
import UserInfoContext from "../store/userinfo-context";
import CartContext from "../store/cart-context";

const DataObject = () => {
  const userContext = useContext(UserInfoContext);
  const cartCtx = useContext(CartContext);
  const [dataObject, setDataObject] = useState({});

  const {
    firstname,
    lastname,
    email,
    phone,
    address,
    addresstwo,
    city,
    state,
    postal,
    scheduled,
    when,
    pickup,
  } = userContext.info;

  let scheduledTime = "";
  if (when !== "ASAP") {
    scheduledTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(scheduled);
  } else {
    scheduledTime = "ASAP";
  }

  let method = 0;
  if (!pickup) {
    method = 1;
  }

  let cartItems = [];
  cartCtx.items.forEach((item) => {
    cartItems.push({
      quantity: item.amount,
      product: {
        id: item.id,
      },
      productOption: {
        id: item.option,
        price: item.price,
      },
    });
  });

  useEffect(() => {
    setDataObject({
      orderItems: cartItems,
      scheduled: scheduledTime,
      delivery: method,
      orderDetails: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        address: address.toUpperCase(),
        addresstwo: addresstwo.toUpperCase(),
        city: city.toUpperCase(),
        state: state.toUpperCase(),
        postal: postal,
      },
    });

    const user = localStorage.getItem("user");
    if (user) {
      let userId = JSON.parse(user).theId;
      setDataObject((prev) => ({ ...prev, account: userId }));
    }
  }, []);

  return { dataObject, scheduledTime };
};

export default DataObject;
