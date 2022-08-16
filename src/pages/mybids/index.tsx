import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { hooks } from "../../components/address-box/metaMask";

import { Grid, Typography, Button } from "@mui/material";

import NFT2 from "../../assets/nft2.png";
import NFT3 from "../../assets/dummynft2.png";

import NftCard from "../../components/nft-card";

import ViewBids from "../../components/modals/viewBids";
import { Contract } from "@ethersproject/contracts";
import { ABI, Address } from "../../constants";

const { useAccounts, useProvider } = hooks;


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

  const provider = useProvider();
  const [receivedBids, setReceivedBids] = useState<any[]>([]);
  const [sentBids, setSentBids] = useState<any[]>([]);

  const [entryIds,setEntryIds]= useState<any[]>([])


  const [openViewBidsModal, setOpenViewBidsModal] = useState(false);
  const [selectCollection, setSelectCollection] = useState(0);

  const accounts = useAccounts();

  const handleSelection = (index: number) => {
    setSelectCollection(index);
  };

  const getReceivedBids = async () => {
    const protocolContract = new Contract(Address, ABI, provider?.getSigner());
    const userAddress = accounts ? accounts[0] : "";
    const nfts = await protocolContract.getUserNFTsOpenForSale(userAddress, {
      gasLimit: 350000,
    });
    console.log(nfts, "from my bids")
    setReceivedBids(nfts.userNFTsOpenForSale_);
    setEntryIds(nfts.entryIds_);
  };

  useEffect(()=>{
    getReceivedBids()
  },[])

  const getSentBids = () =>{
    console.log("sent bids")
    const items = localStorage.getItem('ids')
    if(items) setSentBids(JSON.parse(items))
  }

  useEffect(()=>{
    getSentBids();
  },[])
  

  console.log(sentBids,"=====>sent bids result")
  

  const withdrawBid = () => {
    console.log("withdraw your bid");
  };
  const [contractAddress,setContractAddress] =useState<any>()
  const [tokenId,setTokenId] = useState<any>()
  const [image,setImage] = useState<any>()
  const [name,setName] = useState<any>()
  const[entryId, setEntryId] = useState<any>()

  const openViewBidsModalHandler = (ctAddress:any,tId:any,i:any,n:any,eId:any) : void => {
    // console.log(ctAddress,tId,i,n,eId)
    // console.log(eId)
    // console.log(entryIds[eId]._hex)
    setOpenViewBidsModal(true);
    setContractAddress(ctAddress)
    setTokenId(tId)
    setImage(i)
    setName(n)
    setEntryId(entryIds[eId]._hex)
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
        {selectCollection === 0 &&
          nfts.map((nft) => {
          return (
            <Grid item xs={4} mt={5}>
              <NftCard
                owner={nft.owner}
                bid={nft.bid}
                name={nft.name}
                image={nft.image}
                buttonText={
                  "Withdraw Bid"
                }
                buttonAction={
                  withdrawBid
                }
                buttonDisabled={
                  selectCollection === 0 && !nft.sold ? true : false
                }
              />
            </Grid>
          );
        })}
        
        {selectCollection === 1 &&
            receivedBids.map((nft:any, index:number) => {
              if (
                nft.contractAddress !==
                "0x0000000000000000000000000000000000000000"
              ) {
                return (
                  <Grid item xs={4} mt={5}>
                    <NftCard
                      owner={nft.owner}
                      bid={nft.bid}
                      name={nft.name}
                      image={nft.image}
                      nftContractAddress={nft.contractAddress}
                      nftTokenId={nft.tokenId}
                      buttonText={"View Bids"}
                      buttonAction={()=>openViewBidsModalHandler(nft.contractAddress,nft.tokenId,nft.image,nft.name,index)}
                    />
                  </Grid>
                );
              }
            })}
        {/* {nfts.map((nft) => {
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
        })} */}
      </Grid>
      <ViewBids 
        open={openViewBidsModal} 
        setOpen={setOpenViewBidsModal} 
        contractAddress={contractAddress}
        tokenId={tokenId}
        image={image}
        name={name}
        entryId={entryId}
      />
    </Grid>
  );
};

export default MyBids;
