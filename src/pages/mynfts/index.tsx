import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Contract } from '@ethersproject/contracts'
import { ABI, Address } from '../../constants'
import { hooks } from "../../components/address-box/metaMask";

import { Grid, Typography, Button } from "@mui/material";
import WalletNotConnected from "../../components/not-connected";

import NFT2 from "../../assets/nft2.png";
import NFT3 from "../../assets/dummynft2.png";

import NftCard from "../../components/nft-card";

import InstallmentModal from "../../components/modals/payInstallment";
import OpenForSellModal from "../../components/modals/openForSell";




const { useAccounts, useIsActive, useProvider } = hooks;


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


const unlistedNFTs = [
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT3 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT2 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT3 },
  { owner: "@Johnny", bid: 0.1, name: "Monke", image: NFT2 },
];

const MyNfts = () => {
  const [nftsOwned, setNftsOwned] = useState<any>([]);
  console.log(nftsOwned,"nftsOwned")
  const [openInstallmentModal, setOpenInstallmentModal] = useState(false);
  const [openForSellModal, setOpenForSellModal] = useState(false);
  const [selectCollection, setSelectCollection] = useState(0);
  const provider = useProvider();
  const handleSelection = (index: number) => {
    setSelectCollection(index);
  };

  const accounts = useAccounts();
  const isActive = useIsActive();

  const getUserNFTs = async () => {
    if (accounts) {
      const nfts = await web3.alchemy.getNfts({
        owner: accounts[0],
      });

      setNftsOwned(nfts.ownedNfts);
      console.log(nfts.ownedNfts, "MY NFTS")
    }
  };

  useEffect(() => {
    getUserNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const getListedUserNFTs = async () =>{
    const protocolContract = new Contract(Address, ABI, provider?.getSigner());
    const userAddress = accounts ? accounts[0] : ""
    const nfts = await protocolContract.getUserNFTsOpenForSale(userAddress, {gasLimit: 350000})
    console.log("listed user nfts", nfts)
  }

  useEffect(()=>{
    getListedUserNFTs();
  },[])
  

  const openPayInstallmentModal = () => {
    setOpenInstallmentModal(true);
  };

  const [activeNFT, setActiveNFT] = useState({address:"",image:"", title:"", id:"0"}) 
  const openSetNftForSellModal = (address:string, image: string, title: string, id:string) => {
    let stateActiveNFT = {address:address,image:image, title:title, id:id}
    setActiveNFT(stateActiveNFT)
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
            Listed NFTs
          </Button>
        </Grid>
        <Grid container item>
          {selectCollection === 0 &&
            claimedNFTs.map((nft) => {
              return (
                <Grid item xs={4} mt={5}>
                  <NftCard
                    owner={nft.owner}
                    bid={0}
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
              console.log(nft, "wohooo")
              return nft.media[0].gateway ? (
                <Grid item xs={4} mt={5}>
                  <NftCard
                    owner={accounts ? accounts[0] : ""}
                    bid={0}
                    name={nft.title}
                    image={nft.media[0].gateway}
                    buttonText={"Sell"}
                    buttonAction={()=>openSetNftForSellModal(nft.contract.address,nft.media[0].gateway,nft.title, nft.id.tokenId)}
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
          nftAddress="0x1d5614fDDDb8bA6bc02eCef52f52E04735762fa3"
          nftId={69}
          activeNFT={activeNFT}
        />
      </Grid>
    );
  }
};

export default MyNfts;
