import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import {
    NFT2,
    NFT3,
    NFT4,
    NFT5,
    NFT6,
    NFT7,
    NFT8,
    NFT9,
    NFT10,
    NFT11,
    NFT12,
    NFT13,
    NFT14,
    NFT15,
    NFT16,
    NFT17,
    NFT18,
    NFT19,
    NFT20,
    NFT21,
    NFT22,
    NFT23,
} from "../../assets/index"

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
    img: NFT14,
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: NFT15,
    title: "Burger",
  },
  {
    img: NFT16,
    title: "Camera",
  },
  {
    img: NFT17,
    title: "Coffee",
    cols: 2,
  },
  {
    img: NFT18,
    title: "Hats",
    cols: 2,
  },
  {
    img: NFT19,
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: NFT20,
    title: "Basketball",
  },
  {
    img: NFT21,
    title: "Fern",
  },
];
