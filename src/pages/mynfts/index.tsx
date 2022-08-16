import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Contract } from "@ethersproject/contracts";
import { ABI, Address } from "../../constants";
import { hooks } from "../../components/address-box/metaMask";

import { Grid, Typography, Button } from "@mui/material";
import WalletNotConnected from "../../components/not-connected";

import NFT2 from "../../assets/nft2.png";
import NFT3 from "../../assets/dummynft2.png";

import NftCard from "../../components/nft-card";

import InstallmentModal from "../../components/modals/payInstallment";
import OpenForSellModal from "../../components/modals/openForSell";
import { promises } from "stream";

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

const MyNfts = () => {
  const [nftsOwned, setNftsOwned] = useState<any>([]);
  const [openInstallmentModal, setOpenInstallmentModal] = useState(false);
  const [openForSellModal, setOpenForSellModal] = useState(false);
  const [selectCollection, setSelectCollection] = useState(0);
  const [userListedNFT, setUserListedNFT] = useState<any[]>([]);
  const [userClaimedNFT, setUserClaimedNFT] = useState<any[]>([]);

  const provider = useProvider();
  const handleSelection = (index: number) => {
    setSelectCollection(index);
  };

  const accounts = useAccounts();
  const isActive = useIsActive();

  useEffect(() => {
    getUserNFTs();
  }, [accounts]);

  useEffect(() => {
    getListedUserNFTs();
  }, [accounts]);

  useEffect(() => {
    getClaimedUserNFTs();
  }, [accounts]);

  const getUserNFTs = async () => {
    if (accounts) {
      const nfts = await web3.alchemy.getNfts({
        owner: accounts[0],
      });

      setNftsOwned(nfts.ownedNfts);
    }
  };

  const getListedUserNFTs = async () => {
    const protocolContract = new Contract(Address, ABI, provider?.getSigner());
    const userAddress = accounts ? accounts[0] : "";
    const nfts = await protocolContract.getUserNFTsOpenForSale(userAddress, {
      gasLimit: 350000,
    });
    console.log("listed user nfts", nfts);
    setUserListedNFT(nfts.userNFTsOpenForSale_);
  };

  const getClaimedUserNFTs = async () => {
    const protocolContract = new Contract(Address, ABI, provider?.getSigner());
    const totalBidIds = parseInt(await protocolContract.getTotalBidIds());

    const buyerInfoPromise = [];

    for (let i = 1; i <= totalBidIds; i++) {
      buyerInfoPromise.push(protocolContract.getBuyerInfo(i));
    }

    const buyerInfo = await Promise.all(buyerInfoPromise);

    const claimedNfts = buyerInfo.filter(
      (bid) =>
        accounts && bid.isSelected === true && bid.buyerAddress === accounts[0]
    );

    const sellerInfoPromise = [];
    const result:any = []
    console.log(claimedNfts,"yeh wale nft jo ke claim ka re")
    for(let i = 0; i < claimedNfts.length; i++){
      console.log(claimedNfts[i],"i==>",i)
      sellerInfoPromise.push(protocolContract.getSellerInfo(claimedNfts[i].entryId._hex)) 
    }
    const res = await Promise.all(sellerInfoPromise);
    console.log(res,"thos resultoan")
    
    setUserClaimedNFT(res);
  };


  const [activeTokenId, setActiveTokenId] = useState<any>();
  const [activeContractAddress, setActiveContractAddress] = useState<any>();
  const [activeAmount, setActiveAmount] = useState<any>();
  const [activeTotalInstallment, setActiveTotalInstallment] = useState<any>(); 

  const openPayInstallmentModal = (a:any,c:any,tId:any,i:any,ip:any) => {
    setActiveTokenId(tId);
    setActiveContractAddress(c);
    setActiveAmount(a);
    setOpenInstallmentModal(true);
    console.log(i,ip,"total ins")
    let totalInstallment = parseInt(i) + parseInt(ip)
    setActiveTotalInstallment(totalInstallment)
  };

  const [activeNFT, setActiveNFT] = useState({
    address: "",
    image: "",
    title: "",
    id: "0",
  });
  const openSetNftForSellModal = (
    address: string,
    image: string,
    title: string,
    id: string
  ) => {
    let stateActiveNFT = {
      address: address,
      image: image,
      title: title,
      id: id,
    };
    setActiveNFT(stateActiveNFT);
    setOpenForSellModal(true);
  };


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
            userClaimedNFT.map((nft) => 
            {
              return (
                <Grid item xs={4} mt={5}>
                  <NftCard
                    owner={nft.owner}
                    bid={0}
                    name={nft.name}
                    image={nft.image}
                    buttonText={"Pay Installment"}
                    buttonAction={()=>openPayInstallmentModal(nft.sellingPrice._hex,nft.contractAddress,
                      nft.tokenId,nft.installment,nft.installmentsPaid)}
                    nftContractAddress={nft.contractAddress}
                    nftTokenId={nft.tokenId}
                  />
                </Grid>
              );
            })}

          {selectCollection === 1 &&
            nftsOwned.map((nft: any) => {
              return nft.media[0].gateway ? (
                <Grid item xs={4} mt={5}>
                  <NftCard
                    owner={accounts ? accounts[0] : ""}
                    bid={0}
                    name={nft.title}
                    image={nft.media[0].gateway}
                    buttonText={"Sell"}
                    buttonAction={() =>
                      openSetNftForSellModal(
                        nft.contract.address,
                        nft.media[0].gateway,
                        nft.title,
                        nft.id.tokenId
                      )
                    }
                  />
                </Grid>
              ) : (
                <></>
              );
            })}

          {selectCollection === 2 &&
            userListedNFT.map((nft) => {
              console.log(nft.contractAddress, "contract addresssss");
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
                      buttonText={"Withdraw"}
                      buttonAction={() => console.log("withdrawing amount")}
                    />
                  </Grid>
                );
              }
            })}
        </Grid>

        <InstallmentModal
          open={openInstallmentModal}
          setOpen={setOpenInstallmentModal}
          nftContractAddress={activeContractAddress}
          nftTokenId={activeTokenId}
          amount={activeAmount}
          totalInstallment={activeTotalInstallment}
        />
        <OpenForSellModal
          open={openForSellModal}
          setOpen={setOpenForSellModal}
          activeNFT={activeNFT}
        />
      </Grid>
    );
  }
};

export default MyNfts;
