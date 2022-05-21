import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const images = [
  {
    url: `https://www.hummingbirdhigh.com/wp-content/uploads/2020/11/ube-crinkle-cookies_01_IMG_0023-500x700.jpg`,
    title: "Pastries",
    width: "35%",
  },

  {
    url:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387",
    title: "Coffee",
    width: "35%",
  },
  {
    url:
      "https://cdn.shopify.com/s/files/1/0073/8626/7712/files/IMG_2187_large.JPG?v=1544762460",
    title: "Custom Cakes",
    width: "30%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function ButtonBases() {
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
    >
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: "relative",
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}

// import React from "react";

// import { makeStyles } from "@material-ui/core/styles";
// import { Grid, Box } from "@material-ui/core";
// import Button from "@material-ui/core/Button";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   button: {
//     border: "3px solid",
//     width: "180px",
//     color: "#837D7D",
//     marginTop: 20,
//     marginLeft: 20,
//     marginRight: 20
//   },
// }));

// const ButtonSection = () => {
//   const classes = useStyles();

//   return (
//     <Box mt={5} mb={12}>
//       <Grid container>
//         <Grid item xs={2} sm={1} />
//         <Grid item xs={8} sm={10}>
//           <Grid item container justifyContent="center">
//             <Grid item>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 className={classes.button}
//               >
//                 Catering
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 className={classes.button}
//               >
//                 Baked Goods
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 className={classes.button}
//               >
//                 Cafe Shop
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={2} sm={1} />
//       </Grid>
//     </Box>
//   );
// };

// export default ButtonSection;
