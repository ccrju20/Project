import { React, useContext } from "react";
import { Grid } from "@material-ui/core";
import CartProduct from "./CartProduct";
import Divider from "@material-ui/core/Divider";
import CartContext from "./store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (product) => {
    cartCtx.addItem({ ...product, amount: 1 });
  };

  const cartItemDeleteHandler = (id) => {
    cartCtx.deleteItem(id);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <h1>Cart</h1>
          {cartCtx.items.map((product) => (
            <CartProduct
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.img}
              amount={product.amount}
              onAdd={cartItemAddHandler.bind(null, product)}
              onRemove={cartItemRemoveHandler.bind(null, product.id)}
              onDelete={cartItemDeleteHandler.bind(null, product.id)}
            />
          ))}
          <div>
            <br></br>
            <br></br>
            <Divider variant="fullWidth" /> <br></br>
            <h3>Subtotal: {totalAmount}</h3>
            <h3>Total: {totalAmount}</h3>
          </div>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </>
  );
};

export default Cart;
