import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const CartListItem = (props) => {
  const { id, name, price, image, amount } = props;
  const updatedPrice = `$${(price * amount).toFixed(2)}`;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt="bakeshop" src={image} />
      </ListItemAvatar>
      <ListItemText primary={`${name} x ${amount}`} secondary={updatedPrice} />
    </ListItem>
  );
};

export default CartListItem;
