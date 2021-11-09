import React from "react";

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
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <IconButton onClick={props.onAdd}>
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <ListItemText sx={{ margin: 1 }} primary={amount} />
                </Grid>
                <Grid item>
                  <IconButton onClick={props.onRemove}>
                    <RemoveCircleOutlineIcon />
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
                  <IconButton onClick={props.onAdd}>
                    <ArrowDropUpIcon />
                  </IconButton>
                </Grid>
                <Grid item> {amount}</Grid>

                <Grid item>
                  <IconButton onClick={props.onRemove}>
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
      </Grid>
      <Grid item xs={false} sm={3} />
    </Grid>

    // <Card className={classes.root}>
    //   <Grid container>
    //     <Grid item xs={4} sm={2}>
    //       <Avatar
    //         alt="product image"
    //         src={image}
    //         sx={{ width: 90, height: 80, marginTop: 1.5}}
    //       />
    //     </Grid>
    //     <Grid item xs={8} sm={9} className={classes.description}>
    //       <Grid container alignItems="center">
    //         <Grid item xs={12} sm={2} className={classes.productname}>
    //           <Typography variant="h5" component="h2" className={classes.title}>
    //             {name}
    //           </Typography>
    //           <Typography
    //           color="textSecondary"
    //         >
    //           {updatedPrice}
    //         </Typography>
    //         </Grid>
    //         <Grid item xs={12} sm={10}>
    //           <Grid container>
    //             <Grid item>
    //               <IconButton onClick={props.onAdd}>
    //                 <AddIcon fontSize="small" />
    //               </IconButton>
    //             </Grid>
    //             <Box>
    //               <Typography variant="body1"> {amount}</Typography>
    //             </Box>
    //             <Grid item>
    //               <IconButton onClick={props.onRemove}>
    //                 <RemoveIcon fontSize="small" />
    //               </IconButton>
    //             </Grid>
    //             <Box ml={2}>
    //               <IconButton onClick={props.onDelete}>
    //                 <DeleteIcon />
    //               </IconButton>
    //             </Box>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Card>
  );
};

export default CartProduct;
