import { Grid, Typography, Button } from "@mui/material";
import NFT1 from "../../assets/nft1.png";
import NFT2 from "../../assets/nft2.png";

import NftCard from "../../components/nft-card";

const nfts = [
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT1 },
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT2 },
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT1 },
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT2 },
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT1 },
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT2 },
];

const Collection = () => {
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Typography variant="h3">Collection</Typography>
      </Grid>
      <Grid item xs={3}>
        <Button>Art</Button>
      </Grid>
      <Grid item xs={3}>
        <Button>Sport</Button>
      </Grid>
      <Grid item xs={3}>
        <Button>Photography</Button>
      </Grid>
      <Grid item xs={3}>
        <Button>Pattern</Button>
      </Grid>
      <Grid container item xs={12}>
        {nfts.map((nft) => {
          return (
            <Grid item xs={4}>
              <NftCard
                owner={nft.owner}
                bid={nft.bid}
                name={nft.name}
                image={nft.image}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Collection;
