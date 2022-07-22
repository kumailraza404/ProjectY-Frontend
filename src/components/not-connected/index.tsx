import * as React from "react";
import { Box, Typography, Button } from "@mui/material";


const boxStyle = {
  height:"50vh",
  width:"100%",
  background: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "10px",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-around"
}

const WalletNotConnected: React.FunctionComponent = () => {
  return (
    <Box sx={boxStyle}>
      <Typography fontSize={40} color="primary" fontWeight={700}  >
        Bummer!
      </Typography>

      <Typography fontSize={20} color="primary" fontWeight={500}  >
        To view your Claimed NFTs and Collections connect your wallet 
      </Typography>

      <Button
        variant="contained"
        sx={{
          width:"100px",
          background:
            "linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)",
            color: "#FFFFFF",
            alignSelf:"center"
        }}
          >
            Connect
          </Button>
    </Box>
  );
};

export default WalletNotConnected;
