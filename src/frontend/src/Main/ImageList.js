import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function StandardImageList() {
  const matchesSmall = useMediaQuery("(min-width:900px)");

  return (
    <ImageList
      sx={
        matchesSmall
          ? {
              width: 950,
              height: 500,
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }
          : { width: 360, height: 250 }
      }
      cols={matchesSmall ? 3 : 1}
      rowHeight={164}
      gap={15}
      variant="woven"
    >
      {itemData.map((item, index) => (
        <ImageListItem
          key={index}
          sx={{
            "&:hover": { opacity: 0.9 },
          }}
        >
          <img
            src={`${item.img}?w=4250&h=425&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://ebakeshop-products.s3.amazonaws.com/matcha_brownie.jpg",
  },
  {
    img: "https://ebakeshop-products.s3.amazonaws.com/berry_cake.jpg",
  },
  {
    img: "https://ebakeshop-products.s3.amazonaws.com/oreo_cupcake.jpg",
  },
];
