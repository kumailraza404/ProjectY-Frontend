import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { hooks } from "../../components/address-box/metaMask";

import { Grid, Typography } from "@mui/material";

import NFT2 from "../../assets/nft2.png";
import NFT3 from "../../assets/dummynft2.png";

import NftCard from "../../components/nft-card";

import InstallmentModal from "../../components/modals/payInstallment";
import OpenForSellModal from "../../components/modals/openForSell";

const { useAccounts } = hooks;

const web3 = createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/38niqT-HbTmDsjLdh597zVlW0c94wp0v"
);

const nfts = [
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT3 },
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT2 },
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT3 },
  { owner: "@Johnny", bid: 0.1, name: "Yellow Painting", image: NFT2 },
];

const MyNft = () => {
  // const [nftsOwned, setNftsOwned] = useState<any>();
  const [openInstallmentModal, setOpenInstallmentModal] = useState(false);
  const [openForSellModal, setOpenForSellModal] = useState(false);

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

  const openPayInstallmentModal = () => {
    setOpenInstallmentModal(true);
  };
  const openSetNftForSellModal = () => {
    setOpenForSellModal(true);
  };

  return (
    <Grid container>
      <Grid container item>
        <Grid item xs={12}>
          <Typography variant="h3" color="white">
            Claimed NFTs
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
                buttonText={"Pay Installment"}
                buttonAction={openPayInstallmentModal}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <Typography variant="h3" color="white">
            My NFTs
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
                buttonText={"Sell"}
                buttonAction={openSetNftForSellModal}
              />
            </Grid>
          );
        })}
      </Grid>
      <InstallmentModal
        open={openInstallmentModal}
        setOpen={setOpenInstallmentModal}
      />
      <OpenForSellModal open={openForSellModal} setOpen={setOpenForSellModal} />
    </Grid>
  );
};

export default MyNft;
