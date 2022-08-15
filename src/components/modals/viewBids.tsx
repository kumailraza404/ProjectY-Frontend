import * as React from "react";
import { Grid, Typography, Box, Modal, Checkbox, Button } from "@mui/material";
import NFT from "../../assets/nft2.png";
import MaticLogo from "../../assets/matic.svg";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Contract } from "@ethersproject/contracts";
import { ABI, Address } from "../../constants";
import { hooks } from "../address-box/metaMask";
import {
  createAlchemyWeb3,
  GetNftMetadataParams,
  Nft,
} from "@alch/alchemy-web3";
import { ethers } from "ethers";

const web3 = createAlchemyWeb3(
  "https://eth-rinkeby.alchemyapi.io/v2/38niqT-HbTmDsjLdh597zVlW0c94wp0v"
);
interface ViewBidsProps {
  open: boolean;
  setOpen(value: boolean): void;
  contractAddress: any;
  tokenId: any;
  image: any;
  name: any;
  entryId:any;
}

const ON_GOING_BIDS_DATA = [
  { address: "0x0873...", tp: "80", bid: "500000" },
  { address: "0x0873...", tp: "80", bid: "500000" },
  { address: "0x0873...", tp: "80", bid: "500000" },
  { address: "0x0873...", tp: "80", bid: "500000" },
];

const buttonStyle = {
  background: "linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)",
  marginTop: "10px",
  border: "none",
  color: "white",
  fontSize: "18px",
  height: "40px",
  borderRadius: "10px",
  width: "337px",
  alignSelf: "center",
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "68%",
  background: "#34385F",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const bidBoxStyle = {
  width: "90%",
  background: "rgba(122, 92, 147, 0.3)",
  borderRadius: "10px",
  height: "40px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};
const bidInputStyle = {
  height: "30px",
  width: "100%",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "3px 15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ViewBids: React.FunctionComponent<ViewBidsProps> = ({
  open,
  setOpen,
  contractAddress,
  tokenId,
  image,
  name,
  entryId
}) => {
  const {useProvider} = hooks;
  const provider = useProvider();
  const protocolContract = new Contract(Address, ABI, provider?.getSigner());
  const handleClose = () => setOpen(false);
  const [input, setInput] = React.useState("");
  const [bids, setBids] = React.useState<any>();
  const [nftImage, setNftImage] = React.useState("");
  const [nftName, setNftName] = React.useState("");

  console.log("image from view bids of individual nft", nftImage)

  const getMetaData = async () =>{

    const nftMetadata = await web3.alchemy.getNftMetadata({
        contractAddress: contractAddress ,
        tokenId: tokenId,
      });
      console.log("getMetaData running", nftMetadata)
      setNftImage(
        nftMetadata.metadata?.image ? nftMetadata.metadata?.image : ""
      );
      setNftName(nftMetadata.title);
  }

  const getAllBids = async () => {
    const id = parseInt(entryId, 16);
    const bids = await protocolContract.getAllBidsOnNFT(id, {
      gasLimit: 350000,
    });
    console.log(bids, "bids dekho from view bids", id);
    setBids(bids);
  };

  React.useEffect(() => {
    getAllBids();
    getMetaData();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CloseSharpIcon color="primary" />
          </div>

          <Grid container>
            <Grid
              container
              item
              xs={12}
              md={8}
              alignContent="center"
              flexDirection="column"
            >
              <Typography
                id="modal-modal-title"
                fontSize={20}
                color="primary"
                mt={"10px"}
                mb={"20px"}
                sx={{ fontWeight: "bold" }}
              >
                Received Bids
              </Typography>

              <Grid item style={bidBoxStyle} direction="row">
                <Typography fontSize={16} color="primary" fontWeight={700}>
                  S.No
                </Typography>
                <Typography fontSize={16} color="primary" fontWeight={700}>
                  Address
                </Typography>
                <Typography fontSize={16} color="primary" fontWeight={700}>
                  Trust Points
                </Typography>
                <Typography fontSize={16} color="primary" fontWeight={700}>
                  Bid(Matic)
                </Typography>
              </Grid>


              {
                bids &&
                bids.allBidsOnNFT_
                  .filter(
                    (bid: any) =>
                      bid.buyerAddress !==
                      "0x0000000000000000000000000000000000000000"
                  )
                  .map((bid: any, index: number) => (
                    <Grid style={bidBoxStyle} direction="row" mt={"10px"}>
                      <Typography fontSize={16} color="primary">
                        {index}
                      </Typography>
                      <Typography fontSize={16} color="primary">
                        {bid.buyerAddress.slice(0, 8) + "...."}
                      </Typography>
                      <Typography fontSize={16} color="primary">
                        {80}
                      </Typography>
                      <Typography fontSize={16} color="primary">
                        {ethers.utils.formatEther(
                          parseInt(bid.bidPrice._hex, 16).toString()
                        )}
                      </Typography>
                    </Grid>
                  ))
              }
              {/* {ON_GOING_BIDS_DATA.map((bid, index) => (
                <>
                  <Grid style={bidBoxStyle} direction="row" mt={"10px"}>
                    <Typography fontSize={16} color="primary">
                      <Checkbox
                        sx={{
                          position: "absolute",
                          left: "0px",
                          color: "white",
                          marginTop: "-8px",
                          marginLeft: "8px",
                        }}
                      />
                      {index}
                    </Typography>
                    <Typography fontSize={16} color="primary">
                      {bid.address}
                    </Typography>
                    <Typography fontSize={16} color="primary">
                      {bid.tp}
                    </Typography>
                    <Typography fontSize={16} color="primary">
                      {bid.bid}
                    </Typography>
                  </Grid>
                </>
              ))} */}
              <Box
                fontSize={20}
                sx={{ color: "white", textAlign: "center", margin: "16px 0px" }}
                color="Primary"
              >
                All Bids Closing In 00:00:00
              </Box>
              <Button style={buttonStyle}>
                <Typography fontSize={20} color="Primary">
                  Select Bid
                </Typography>
              </Button>
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={4}
              alignContent="center"
              direction="column"
            >
              <img src={nftImage} style={{ height: "200px", width: "200px" }} />
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography fontSize={20} color="primary" fontWeight={700}>
                  {nftName}
                </Typography>
              </div>

              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontSize={14} color="primary">
                  Remaining Time
                </Typography>
                <Typography fontSize={14} color="secondary">
                  1.5 Hour
                </Typography>
              </div>

              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontSize={14} color="primary">
                  Highest Bid
                </Typography>
                <Typography fontSize={14} color="secondary">
                  100 Matic
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewBids;
