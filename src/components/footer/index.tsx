import { Grid, Typography } from "@mui/material";
import Logo from "../../assets/ProjectY.png";

import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(() => ({
  color: "rgba(255, 255, 255, 0.5)",
  margin: "24px 0px",
  fontSize: "14px",
}));

const Footer = () => {
  return (
    <Grid
      sx={{ marginTop: "128px", textAlign: "left" }}
      container
      justifyContent="space-between"
    >
      <Grid xs={2} item>
        <Typography>
          <img src={Logo} alt="logo" />
        </Typography>
        <StyledTypography>
          The NFT marketplace to buy NFTs on installment
        </StyledTypography>
      </Grid>
      <Grid xs={2} item>
        <Typography color="#ffffff" fontWeight="bold">
          About
        </Typography>
        <StyledTypography>Product</StyledTypography>
        <StyledTypography>Resource</StyledTypography>
        <StyledTypography>Terms and Condition</StyledTypography>
        <StyledTypography>FAQ</StyledTypography>
      </Grid>
      <Grid xs={2} item>
        <Typography color="#ffffff" fontWeight="bold">
          Company
        </Typography>
        <StyledTypography>Our Team</StyledTypography>
        <StyledTypography>Partner With Us</StyledTypography>
        <StyledTypography>Privacy and Policy</StyledTypography>
        <StyledTypography>Features</StyledTypography>
      </Grid>
      <Grid xs={2} item>
        <Typography color="#ffffff" fontWeight="bold">
          Contact
        </Typography>
        <StyledTypography>003131300131</StyledTypography>
        <StyledTypography>test@gmail.com</StyledTypography>
      </Grid>
      <Grid xs={12} item>
        <StyledTypography sx={{ textAlign: "center", marginTop: "48px" }}>
          Created By Komal | All Rights Reserved.
        </StyledTypography>
      </Grid>
    </Grid>
  );
};

export default Footer;
