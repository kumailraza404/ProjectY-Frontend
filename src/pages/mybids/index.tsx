import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { hooks } from "../../components/address-box/metaMask";

import { Grid, Typography } from "@mui/material";

import NFT2 from "../../assets/nft2.png";
import NFT3 from "../../assets/dummynft2.png";

import NftCard from "../../components/nft-card";

import ViewBids from "../../components/modals/viewBids";

const { useAccounts } = hooks;

const web3 = createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/38niqT-HbTmDsjLdh597zVlW0c94wp0v"
);

const nfts = [
  {
    owner: "@Johnny",
    bid: 0.1,
    name: "Yellow Painting",
    image: NFT3,
    sold: false,
  },
  {
    owner: "@Johnny",
    bid: 0.1,
    name: "Yellow Painting",
    image: NFT2,
    sold: true,
  },
  {
    owner: "@Johnny",
    bid: 0.1,
    name: "Yellow Painting",
    image: NFT3,
    sold: false,
  },
  {
    owner: "@Johnny",
    bid: 0.1,
    name: "Yellow Painting",
    image: NFT2,
    sold: false,
  },
];

const MyBids = () => {
  // const [nftsOwned, setNftsOwned] = useState<any>();

  const [openViewBidsModal, setOpenViewBidsModal] = useState(false);

  const accounts = useAccounts();

  useEffect(() => {
    getUserNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const getUserNFTs = async () => {
    if (accounts) {
      console.log("fetching user nfts");
      //   const nfts = await web3.alchemy.getNfts({
      //     owner: "0xDAA50a02340cBcFA1a6F4c02765430Ffe411b188",
      //   });
      //   console.log("fetching user nfts", nfts);

      //   setNftsOwned(nfts);
    }
  };

  const withdrawBid = () => {
    console.log("withdraw your bid");
  };
  const openViewBidsModalHandler = () => {
    setOpenViewBidsModal(true);
  };

  return (
    <Grid container>
      <Grid container item>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="white"
            textAlign="left"
          >
            Sent Bids
          </Typography>
        </Grid>
        {nfts.map((nft) => {
          return (
            <Grid item xs={4} mt={5}>
              <NftCard
                owner={nft.owner}
                bid={nft.bid}
                name={nft.name}
                image={nft.image}
                buttonText={"Withdraw Bid"}
                buttonAction={withdrawBid}
                buttonDisabled={!nft.sold}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container item sx={{ marginTop: "32px" }}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="white"
            textAlign="left"
          >
            Received Bids
          </Typography>
        </Grid>
        {nfts.map((nft) => {
          return (
            <Grid item xs={4} mt={5}>
              <NftCard
                owner={nft.owner}
                bid={nft.bid}
                name={nft.name}
                image={nft.image}
                buttonText={"View Bids"}
                buttonAction={openViewBidsModalHandler}
              />
            </Grid>
          );
        })}
      </Grid>
      <ViewBids open={openViewBidsModal} setOpen={setOpenViewBidsModal} />
    </Grid>
  );
};

export default MyBids;
