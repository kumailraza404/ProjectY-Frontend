import * as React from "react";
import { Grid, Typography, Box, Modal, Input, Checkbox } from "@mui/material";
import NFT from "../../assets/nft2.png";
import MaticLogo from "../../assets/matic.svg";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";

interface OpenForSellProps {
  open: boolean;
  setOpen(value: boolean): void;
}

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
const planTypeBoxStyle = {
  width: "150px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "3px 15px",
  display: "flex",
};

const auctionBoxStyle = {
  height: "30px",
  width: "150px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "3px 15px",
  display: "flex",
  justifyContent:"center",

}

const bidInputStyle = {
  height: "30px",
  width: "150px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "3px 15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const OpenForSell: React.FunctionComponent<OpenForSellProps> = ({
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

          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            color="primary"
            fontWeight={700}
          >
            Mark Your NFT Open
          </Typography>

          <Grid container>
            <Grid container item xs={12} md={7} flexDirection="column">
              <Typography fontSize={20} color="primary" mt={"40px"}>
                Select Installment Plan
              </Typography>
              <Grid container mt={"30px"}>
                <Grid container item xs={12} md={3}>
                  <Typography
                    id="modal-modal-title"
                    fontSize={16}
                    color="primary"
                    mt={1}
                  >
                    Plan Type
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
                  <Box style={planTypeBoxStyle} sx={{ display: 'flex', flexDirection:"column" }}>
                    <Box sx={{ display: 'flex', flexDirection:"row", alignItems:"center", borderBottom:"1px solid #FFFFFF33"}}>
                      <Checkbox sx={{ '& .MuiSvgIcon-root': { color: "#FFFFFF80" } }}/>
                    <Typography fontSize={16} color="secondary">
                      1-Time
                    </Typography>
                    </Box>
                    
                    
                    <Box sx={{ display: 'flex', flexDirection:"row", alignItems:"center", borderBottom:"1px solid #FFFFFF33"}}>
                      <Checkbox sx={{ '& .MuiSvgIcon-root': { color: "#FFFFFF80" } }}/>
                    <Typography fontSize={16} color="secondary">
                      3-Months
                    </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection:"row", alignItems:"center" , borderBottom:"1px solid #FFFFFF33" }}>
                      <Checkbox sx={{ '& .MuiSvgIcon-root': { color: "#FFFFFF80" } }}/>
                    <Typography fontSize={16} color="secondary">
                      6-Months
                    </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection:"row", alignItems:"center" }}>
                      <Checkbox sx={{ '& .MuiSvgIcon-root': { color: "#FFFFFF80" } }}/>
                    <Typography fontSize={16} color="secondary">
                      9-Months
                    </Typography>
                    </Box>
                    
                  </Box>
                </Grid>
              </Grid>


              <Grid container mt={"10px"} >
                <Grid container item xs={12} md={3}>
                  <Typography
                    id="modal-modal-title"
                    fontSize={16}
                    color="primary"
                    mt={1}
                  >
                    Auction Period
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
                  <Box style={auctionBoxStyle} sx={{ display: 'flex', flexDirection:"column" }}>
                    <Typography fontSize={16} color="secondary" ml="10px">
                      7-Days
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Grid container mt={"10px"}>
                <Grid container item xs={12} md={3}>
                  <Typography
                    id="modal-modal-title"
                    fontSize={16}
                    color="primary"
                    mt={1}
                  >
                    Floor Price
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
                </Grid>
              </Grid>

              <Typography fontSize={16} color="secondary" mt="40px">
                Note: By clicking on Submit, you are agreeing to our Terms and Conditions
              </Typography>

              <button style={buttonStyle}>
                <Typography fontSize={20} color="Primary">
                  Submit
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
              <img src={NFT} style={{ height: "300px", width: "300px" }} />
              <Box
                sx={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection:"column"
                }}
              >
                <Typography fontSize={20} color="primary" fontWeight={700} textAlign="center" >
                  Bored Ape
                </Typography>
                <Typography 
                fontSize={16} color="secondary" fontWeight={500}>
                  @Johnny
                </Typography>
                
              </Box>

              

              

              
              
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default OpenForSell;
