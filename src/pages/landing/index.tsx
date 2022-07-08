import { Grid, Typography, Box } from "@mui/material";

import ImageGallery from "./imageGallery";
import Collection from "./Collection";

const Landing = () => {
  return (
    <>
      <Grid container>
        <Grid container item xs={12} md={6}>
          <Box sx={{ display: "block" }}>
            <Typography variant="h3" align="left" color="white">
              Explore, Collect and Sell Premium NFTs on installments
            </Typography>
          </Box>
          <Box sx={{ display: "block" }}>
            <Typography color="white">
              The Best Flexible Plans and Terms designed for you
            </Typography>
          </Box>
        </Grid>
        <Grid container item xs={12} md={6}>
          <ImageGallery />
        </Grid>
        <Grid container item xs={12}>
          <Collection />
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
