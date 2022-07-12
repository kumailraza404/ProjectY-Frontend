import { Grid, Typography, Box, Button } from "@mui/material";

import { useState } from "react";

import ImageGallery from "./imageGallery";
import Collection from "./Collection";
import Numbers from "./numbers";
import PlaceBidModal from "../../components/modals/placeBid";

const buttonStyleSelected = {
  background: "linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)",
  height: "40px",
  margin: "2px 8px",
  borderRadius: "12px",
};
const buttonStyleNotSelected = {
  background: "rgba(255, 255, 255, 0.1)",
  height: "40px",
  margin: "2px 8px",
  borderRadius: "12px",
};

const Landing = () => {
  const [openPlaceBidModal, setOpenPlaceBidModal] = useState(false);

  return (
    <>
      <Grid container>
        <Grid
          sx={{ paddingRight: "64px" }}
          container
          item
          alignItems="center"
          xs={12}
          md={6}
        >
          <Box sx={{ display: "block" }}>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h3"
              align="left"
              color="white"
            >
              Explore, Collect and Sell Premium NFTs on installments
            </Typography>
          </Box>
          <Box sx={{ display: "block" }}>
            <Typography color="white">
              The Best Flexible Plans and Terms designed for you
            </Typography>
          </Box>
          <Box>
            <Button style={buttonStyleSelected} variant="contained">
              Explore Now
            </Button>
            <Button style={buttonStyleNotSelected} variant="contained">
              Sell NFT
            </Button>
          </Box>
          <Numbers />
        </Grid>
        <Grid container item xs={12} md={6}>
          <ImageGallery />
        </Grid>
        <Grid container item xs={12}>
          <Collection setOpenPlaceBidModal={setOpenPlaceBidModal} />
        </Grid>
        <PlaceBidModal
          open={openPlaceBidModal}
          setOpen={setOpenPlaceBidModal}
        />
      </Grid>
    </>
  );
};

export default Landing;
