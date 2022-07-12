import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import NFT1 from "../../assets/nft1.png";
import NFT2 from "../../assets/nft2.png";
import NFT3 from "../../assets/dummynft2.png";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: "100%", height: "auto" }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
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
    img: NFT1,
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: NFT2,
    title: "Burger",
  },
  {
    img: NFT3,
    title: "Camera",
  },
  {
    img: NFT1,
    title: "Coffee",
    cols: 2,
  },
  {
    img: NFT2,
    title: "Hats",
    cols: 2,
  },
  {
    img: NFT3,
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: NFT1,
    title: "Basketball",
  },
  {
    img: NFT2,
    title: "Fern",
  },
];
