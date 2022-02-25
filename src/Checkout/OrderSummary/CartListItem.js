import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from '@mui/material/Typography';

const CartListItem = (props) => {
  const { name, price, amount } = props;
  const updatedPrice = `$${(price * amount).toFixed(2)}`;

  return (
    <ListItem>
      <ListItemText primary={`${name} x ${amount}`}  secondary={price}/>
      <Typography>{updatedPrice}</Typography>
    </ListItem>
  );
};

export default CartListItem;
