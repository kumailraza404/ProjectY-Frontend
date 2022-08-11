import * as React from "react";
import {
  Grid,
  Typography,
  Box,
  Modal,
  Input,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import NFT from "../../assets/nft2.png";
import MaticLogo from "../../assets/matic.svg";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { hooks } from "../address-box/metaMask";
import { ABI, Address } from "../../constants";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";

export interface BidsInterface {
  address: string;
  tp: string;
  amount: string;
}
interface NftObjectInterface {
  remainingTime: string;
  title: string;
  bids: BidsInterface[];
}
interface PlaceBidProps {
  open: boolean;
  setOpen(value: boolean): void;
  handleClose(value: boolean): void;
  name: string;
  image: string;
  remainingTime: string;
  highestBid: string;
  entryId: any;
  sellerAddress: string;
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

const planTypeBoxStyle = {
  width: "150px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "3px 15px",
  display: "flex",
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
const loaderDivStyle = {
  width: "90%",
  background: "rgba(122, 92, 147, 0.3)",
  borderRadius: "10px",
  height: "190px",
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

const planTypeStyle = {
  height: "30px",
  width: "51%",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "3px 15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  border: "none",
};

const PlaceBid: React.FunctionComponent<PlaceBidProps> = ({
  open,
  image,
  handleClose,
  name,
  sellerAddress,
  entryId,
}) => {
  const [input, setInput] = React.useState("");
  const [planType, setplanType] = React.useState("1");
  const [bidPercentage, setbidPercentage] = React.useState(34);
  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    if (planType == "0") {
      setbidPercentage(100);
    }
    if (planType == "1") {
      setbidPercentage(34);
    }
    if (planType == "2") {
      setbidPercentage(17.5);
    }
    if (planType == "3") {
      setbidPercentage(12);
    }
  }, [planType]);

  const { useProvider } = hooks;
  const provider = useProvider();
  const protocolContract = new Contract(Address, ABI, provider?.getSigner());

  const getAllBids = async () => {
    console.log(entryId);
    console.log(parseInt(entryId, 16));
    const bids = await protocolContract.getAllBidsOnNFT(
      parseInt(entryId._hex, 16),
      {
        gasLimit: 350000,
      }
    );
    console.log(bids, "bids dekho");
    // setNFTCollection(nfts.nftsOpenForSale_);
  };

  React.useEffect(() => {
    getAllBids();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setplanType(event.target.value as string);
  };

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

          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            color="primary"
            fontWeight={700}
          >
            Place A Bid
          </Typography>

          <Grid container>
            <Grid container item xs={12} md={7} flexDirection="column">
              <Typography
                id="modal-modal-title"
                fontSize={20}
                color="primary"
                mt={"10px"}
                mb={"20px"}
              >
                On-going Bids
              </Typography>

              <Grid style={bidBoxStyle} direction="row">
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

              {loader ? (
                <Grid style={loaderDivStyle} direction="row" mt={"10px"}>
                  <CircularProgress />
                </Grid>
              ) : (
                ON_GOING_BIDS_DATA.map((bid, index) => (
                  <Grid style={bidBoxStyle} direction="row" mt={"10px"}>
                    <Typography fontSize={16} color="primary">
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
                ))
              )}
              <Typography fontSize={20} color="primary" mt={"40px"}>
                Propose Your Bid
              </Typography>
              <Grid container mt={"30px"}>
                <Grid container item xs={12} md={3}>
                  <Typography
                    id="modal-modal-title"
                    fontSize={16}
                    color="primary"
                    mt={0}
                  >
                    Select Plan Type
                  </Typography>
                </Grid>

                <Grid container item xs={12} md={9}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={planType}
                    label="PlanType"
                    onChange={handleChange}
                    style={planTypeStyle}
                  >
                    <MenuItem value={0}>1-Time Payment</MenuItem>
                    <MenuItem value={1}>3-Months</MenuItem>
                    <MenuItem value={2}>6-Months</MenuItem>
                    <MenuItem value={3}>9-Months</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid container mt={"30px"}>
                <Grid container item xs={12} md={3}>
                  <Typography
                    id="modal-modal-title"
                    fontSize={16}
                    color="primary"
                  >
                    Your Bid
                  </Typography>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  md={4}
                  direction="column"
                  justifyContent={"center"}
                >
                  <Box style={bidInputStyle}>
                    <Input
                      color="primary"
                      placeholder="100"
                      style={{ width: "70%", color: "white" }}
                      disableUnderline
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />

                    <img
                      src={MaticLogo}
                      style={{ height: "25px", width: "25px" }}
                    />
                  </Box>
                  <Typography
                    fontSize={12}
                    color="secondary"
                    alignSelf={"center"}
                  >
                    First Y-Payment:{" "}
                    {isNaN((parseInt(input) * bidPercentage) / 100)
                      ? "0"
                      : (parseInt(input) * bidPercentage) / 100}{" "}
                    MATIC
                  </Typography>
                </Grid>
              </Grid>

              <Typography fontSize={16} color="secondary" mt="40px">
                Note: To process this Bid {bidPercentage}% of your Bid i.e. the
                First Month’s Y-Payment will be locked.
              </Typography>

              <button style={buttonStyle}>
                <Typography fontSize={20} color="Primary">
                  Place Bid
                </Typography>
              </button>
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={5}
              alignContent="center"
              direction="column"
            >
              <img
                alt="nft"
                src={image}
                style={{
                  height: "370px",
                  width: "370px",
                  borderRadius: "10px",
                }}
              />
              <div
                style={{
                  width: "370px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Typography fontSize={20} color="primary" fontWeight={700}>
                  {name}
                </Typography>
              </div>

              <div
                style={{
                  width: "370px",
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
                  width: "370px",
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
              <Typography fontSize={14} color="secondary">
                @{sellerAddress}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default PlaceBid;
