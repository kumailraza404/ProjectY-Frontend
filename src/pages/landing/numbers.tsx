import React from "react";
import { Typography, Grid } from "@mui/material";

const numbers = () => {
  return (
    <Grid container item>
      <Grid xs={3} item>
        <Typography color="white" fontSize="24px" fontWeight="bold">
          37k+
        </Typography>
        <Typography color="rgba(255, 255, 255, 0.5)">Artwork</Typography>
      </Grid>
      <Grid xs={3} item>
        <Typography color="white" fontSize="24px" fontWeight="bold">
          20k+
        </Typography>
        <Typography color="rgba(255, 255, 255, 0.5)">Artist</Typography>
      </Grid>
      <Grid xs={3} item>
        <Typography color="white" fontSize="24px" fontWeight="bold">
          99k+
        </Typography>
        <Typography color="rgba(255, 255, 255, 0.5)">Aucations</Typography>
      </Grid>
    </Grid>
  );
};

export default numbers;
