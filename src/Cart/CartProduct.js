import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Hidden from "@material-ui/core/Hidden";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  content: {
    marginLeft: 45,
  },
});

const CartProduct = (props) => {
  const classes = useStyles();
  const { name, price, image, amount } = props;
  const updatedPrice = `$${(price * amount).toFixed(2)}`;

  const [itemAmount, setItemAmount] = useState(amount);
  const [removeLimit, setRemoveLimit] = useState(false);

  const handleRemove = () => {
    if (itemAmount !== 1) {
      setItemAmount((curr) => curr - 1);
    }
  };

  const handleAdd = () => {
    setItemAmount((curr) => curr + 1);
  };

  const handleUpdate = () => {
    const diff = itemAmount - amount;
    console.log(diff);
    props.onAdd(diff);
  };

  console.log(amount);
  console.log(itemAmount);

  return (
    <Grid container>
      <Grid item xs={false} sm={3} />

      <Grid item xs={12} sm={6}>
        <Card>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="bakeshop"
                src={image}
                variant="square"
                sx={{ width: 85, height: 80, marginRight: 2 }}
              />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={updatedPrice} />
            <Hidden smDown={true}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <IconButton onClick={handleRemove} disabled={removeLimit}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <ListItemText sx={{ margin: 1 }} primary={itemAmount} />
                </Grid>
                <Grid item>
                  <IconButton onClick={handleAdd}>
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Hidden>

            <Hidden mdUp={true}>
              <Grid
                container
                direction="column"
                alignItems="center"
                className={classes.content}
              >
                <Grid item>
                  <IconButton onClick={handleAdd}>
                    <ArrowDropUpIcon />
                  </IconButton>
                </Grid>
                <Grid item> {itemAmount}</Grid>
                <Grid item>
                  <IconButton onClick={handleRemove}>
                    <ArrowDropDownIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Hidden>

            <IconButton onClick={props.onDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </Card>
        <Button
          onClick={handleUpdate}
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            backgroundColor: "#41166c",
            "&:hover": {
              backgroundColor: "#290052",
            },
          }}
        >
          Update Items
        </Button>
      </Grid>
      <Grid item xs={false} sm={3} />
    </Grid>
  );
};

export default CartProduct;
