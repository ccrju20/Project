import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  deleteItem: (id) => {},
});

export default CartContext;
