import { React, useContext } from "react";
import CartContext from "../store/cart-context";

import List from "@mui/material/List";
import CartListItem from "./CartListItem";

const CheckoutCartList = () => {
  const cartCtx = useContext(CartContext);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {cartCtx.items.map((product) => (
        <CartListItem
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.img}
          amount={product.amount}
        />
      ))}
    </List>
  );
};

export default CheckoutCartList;
