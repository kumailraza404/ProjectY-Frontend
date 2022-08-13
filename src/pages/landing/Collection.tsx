import React from "react";
import { Grid, Typography, Button } from "@mui/material";

import { Contract } from "@ethersproject/contracts";
import { ABI, Address } from "../../constants";
import { hooks } from "../../components/address-box/metaMask";
import PlaceBid, { BidsInterface } from "../../components/modals/placeBid";
import CollectionCard from "../../components/collection-card";

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

const Collection: React.FunctionComponent = ({}) => {
  const [selectCollection, setSelectCollection] = React.useState(0);
  const handleSelection = (index: number) => {
    getAllNFTs();
    setSelectCollection(index);
  };
  const [openPlaceBidModal, setOpenPlaceBidModal] = React.useState(false);
  const [NFTCollection, setNFTCollection] = React.useState<any[]>([]);
  const [entryIds, setEntryIds] = React.useState<any[]>([]);

  const [remainingTime, setRemainingTime] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [bids, setBids] = React.useState<BidsInterface>();
  const handleOpenBidModal = (r: string, t: string, b: BidsInterface) => {
    setRemainingTime(r);
    setTitle(t);
    setBids(b);
    setOpenPlaceBidModal(true);
  };
  //state nfts

  const { useProvider } = hooks;
  const provider = useProvider();
  const protocolContract = new Contract(Address, ABI, provider?.getSigner());

  const getAllNFTs = async () => {
    const nfts = await protocolContract.getNFTsOpenForSale({
      gasLimit: 350000,
    });
    setNFTCollection(nfts.nftsOpenForSale_);
    setEntryIds(nfts.entryIds_);
    console.log(nfts, "all nfttttttt");
  };

  React.useEffect(() => {
    getAllNFTs();
  }, []);

  //useEffect

  return (
    <Grid container item xs={12} mt={20}>
      <Grid item xs={12} mb={5}>
        <Typography variant="h3" color="white">
          Collection
        </Typography>
        <Typography variant="h6" color="rgba(255, 255, 255, 0.5)">
          Browse our Latest Collection of Top Notch NFTs
        </Typography>
      </Grid>
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
          Art
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
          Sport
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
          Photography
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          style={
            selectCollection === 3
              ? buttonStyleSelected
              : buttonStyleNotSelected
          }
          variant="contained"
          onClick={() => handleSelection(3)}
        >
          Pattern
        </Button>
      </Grid>
      <Grid container item xs={12}>
        {NFTCollection &&
          NFTCollection.map((nft: any, index: number) => {
            console.log(entryIds[index], "indi entry id");
            return (
              <Grid item xs={4} mt={5}>
                <CollectionCard
                  owner={nft.sellerAddress}
                  bid={nft.bid}
                  buttonText={"Place a bid"}
                  buttonAction={() => setOpenPlaceBidModal(true)}
                  buttonAction2={handleOpenBidModal}
                  nftContractAddress={nft.contractAddress}
                  nftTokenId={nft.tokenId}
                  entryId={entryIds[index]._hex}
                />
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Collection;
