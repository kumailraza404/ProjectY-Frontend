import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { hooks } from "../../components/address-box/metaMask";

import { Grid, Typography, Button } from "@mui/material";

import NFT2 from "../../assets/nft2.png";
import NFT3 from "../../assets/dummynft2.png";

import NftCard from "../../components/nft-card";

import ViewBids from "../../components/modals/viewBids";

const { useAccounts } = hooks;

const web3 = createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/38niqT-HbTmDsjLdh597zVlW0c94wp0v"
);

const buttonStyleSelected = {
  background: "linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)",
  width: "90%",
  height: "40px",
};
const buttonStyleNotSelected = {
  background: "rgba(255, 255, 255, 0.1)",
  width: "90%",
  height: "40px",
};

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
  const [selectCollection, setSelectCollection] = useState(0);

  const accounts = useAccounts();

  const handleSelection = (index: number) => {
    setSelectCollection(index);
  };

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
      <Grid item xs={3}>
        <Button
          style={
            selectCollection === 0
              ? buttonStyleSelected
              : buttonStyleNotSelected
          }
          variant="contained"
          onClick={() => handleSelection(0)}
        >
          Sent Bids
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          style={
            selectCollection === 1
              ? buttonStyleSelected
              : buttonStyleNotSelected
          }
          variant="contained"
          onClick={() => handleSelection(1)}
        >
          Received Bids
        </Button>
      </Grid>
      <Grid container item>
        {nfts.map((nft) => {
          return (
            <Grid item xs={4} mt={5}>
              <NftCard
                owner={nft.owner}
                bid={nft.bid}
                name={nft.name}
                image={nft.image}
                buttonText={
                  selectCollection === 0 ? "Withdraw Bid" : "View Bids"
                }
                buttonAction={
                  selectCollection === 0
                    ? withdrawBid
                    : openViewBidsModalHandler
                }
                buttonDisabled={
                  selectCollection === 0 && !nft.sold ? true : false
                }
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
