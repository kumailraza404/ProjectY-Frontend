import { Grid, Typography, Box, Button } from "@mui/material";

import ImageGallery from "./imageGallery";

const Landing = () => {
  return (
    <>
      <Grid container>
        <Grid container item xs={12} md={6}>
          <Box sx={{ display: "block" }}>
            <Typography variant="h3">
              Explore, Collect and Sell Premium NFTs on installments
            </Typography>
          </Box>
          <Box sx={{ display: "block" }}>
            <Typography>
              The Best Flexible Plans and Terms designed for you
            </Typography>
          </Box>
        </Grid>
        <Grid container item xs={12} md={6}>
          <ImageGallery />
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
