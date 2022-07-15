import * as React from "react";
import { Grid, Typography, Box, Modal, Input, Button } from "@mui/material";
import NFT from "../../assets/nft2.png";
import MaticLogo from "../../assets/matic.svg";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";

interface ViewBidsProps {
  open: boolean;
  setOpen(value: boolean): void;
  // image: string;
  // title: string;
  // remainingTime: string;
  // highestBid: string;
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
}) => {
  const handleClose = () => setOpen(false);
  const [input, setInput] = React.useState("");

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

              {ON_GOING_BIDS_DATA.map((bid, index) => (
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
              ))}

              <Button style={buttonStyle}>
                <Typography fontSize={20} color="Primary">
                  Accept Bid
                </Typography>
              </Button>
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={5}
              alignContent="center"
              direction="column"
            >
              <img src={NFT} style={{ height: "200px", width: "200px" }} />
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography fontSize={20} color="primary" fontWeight={700}>
                  Bored Ape
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
