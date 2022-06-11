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
            "&:hover": { opacity: 0.9, transform: "scale3d(1.02, 1.02, 1)"  },
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
    img:
      "https://images.unsplash.com/photo-1426869884541-df7117556757?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    img:
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=394&q=80",
  },
  {
    img:
      "https://images.unsplash.com/photo-1557308536-ee471ef2c390?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
];
