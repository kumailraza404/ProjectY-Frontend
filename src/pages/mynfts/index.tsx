import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { hooks } from "../../components/address-box/metaMask";

import { Grid, Typography, Button } from "@mui/material";
import WalletNotConnected from "../../components/not-connected";

import NFT2 from "../../assets/nft2.png";
import NFT3 from "../../assets/dummynft2.png";

import NftCard from "../../components/nft-card";

import InstallmentModal from "../../components/modals/payInstallment";
import OpenForSellModal from "../../components/modals/openForSell";

const { useAccounts, useIsActive } = hooks;

const web3 = createAlchemyWeb3(
  "https://eth-rinkeby.alchemyapi.io/v2/38niqT-HbTmDsjLdh597zVlW0c94wp0v"
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

const claimedNFTs = [
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT3 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT3 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT3 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT3 },
];

const myNFTs = [
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT2 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT2 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT2 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT2 },
];

const unlistedNFTs = [
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT3 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT2 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT3 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT2 },
];

const MyNfts = () => {
  const [nftsOwned, setNftsOwned] = useState<any>([]);
  const [openInstallmentModal, setOpenInstallmentModal] = useState(false);
  const [openForSellModal, setOpenForSellModal] = useState(false);
  const [selectCollection, setSelectCollection] = useState(0);
  const handleSelection = (index: number) => {
    setSelectCollection(index);
  };

  const accounts = useAccounts();
  const isActive = useIsActive();

  useEffect(() => {
    getUserNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const getUserNFTs = async () => {
    if (accounts) {
      const nfts = await web3.alchemy.getNfts({
        owner: accounts[0],
      });

      setNftsOwned(nfts.ownedNfts);
    }
  };

  const openPayInstallmentModal = () => {
    setOpenInstallmentModal(true);
  };
  const openSetNftForSellModal = () => {
    setOpenForSellModal(true);
  };

  // const [walletConnected, setWalletConnected] = useState(true);

  if (!isActive) {
    return <WalletNotConnected />;
  } else {
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
            Claimed NFTs
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
            My NFTs
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            style={
              selectCollection === 2
                ? buttonStyleSelected
                : buttonStyleNotSelected
            }
            variant="contained"
            onClick={() => handleSelection(2)}
          >
            Unlisted NFTs
          </Button>
        </Grid>
        <Grid container item>
          {selectCollection === 0 &&
            claimedNFTs.map((nft) => {
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

          {selectCollection === 1 &&
            nftsOwned.map((nft: any) => {
              return nft.media[0].gateway ? (
                <Grid item xs={4} mt={5}>
                  <NftCard
                    owner={nft.owner}
                    bid={nft.bid}
                    name={nft.title}
                    image={nft.media[0].gateway}
                    buttonText={"Sell"}
                    buttonAction={openSetNftForSellModal}
                  />
                </Grid>
              ) : (
                <></>
              );
            })}

          {selectCollection === 2 &&
            unlistedNFTs.map((nft) => {
              return (
                <Grid item xs={4} mt={5}>
                  <NftCard
                    owner={nft.owner}
                    bid={nft.bid}
                    name={nft.name}
                    image={nft.image}
                    buttonText={"Withdraw"}
                    buttonAction={() => console.log("withdrawing amount")}
                  />
                </Grid>
              );
            })}
        </Grid>

        <InstallmentModal
          open={openInstallmentModal}
          setOpen={setOpenInstallmentModal}
        />
        <OpenForSellModal
          open={openForSellModal}
          setOpen={setOpenForSellModal}
          nftAddress="0x68DE5b77E7d9ECeA761Aa171Ce7625d870539c46"
          nftId={69}
        />
      </Grid>
    );
  }
};

export default MyNfts;
