import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Hidden from "@material-ui/core/Hidden";

const CartListItem = (props) => {
  const { name, price, image, amount } = props;
  const updatedPrice = `$${(price * amount).toFixed(2)}`;

  return (
    <ListItem>
      <Hidden xsDown={true}>
      <ListItemAvatar>
        <Avatar alt="bakeshop" src={image} />
      </ListItemAvatar></Hidden>
      <ListItemText primary={`${name} x ${amount}`} secondary={updatedPrice} />
    </ListItem>
  );
};

export default CartListItem;
