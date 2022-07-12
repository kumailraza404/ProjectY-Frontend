import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface NFTCardProps {
  owner: string;
  bid: number;
  name: string;
  image: string;
  buttonText: string;
  buttonAction(): void;
}

const cardStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "10px",
};

const buttonStyle = {
  background: "linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)",
  marginTop: "10px",
  border: "none",
  color: "white",
  fontSize: "18px",
  height: "40px",
  borderRadius: "10px",
};

const NFTCard: React.FunctionComponent<NFTCardProps> = ({
  owner,
  bid,
  name,
  image,
  buttonText,
  buttonAction,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }} style={cardStyle}>
      <CardActionArea style={{ padding: 20 }}>
        <CardMedia
          component="img"
          height="340"
          image={image}
          alt="green iguana"
          style={{ borderRadius: "10px" }}
        />
        <CardContent style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                alignItems: "flex-start",
              }}
            >
              <Typography
                gutterBottom
                variant="h2"
                color="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: "16px", fontWeight: "500" }}
              >
                {owner}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                color="white"
                style={{ fontSize: "18px", fontWeight: "700" }}
              >
                {name}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                alignItems: "flex-end",
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                color="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: "12px", fontWeight: "700" }}
              >
                Current Bid
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color="white"
                style={{ fontSize: "12px", fontWeight: "700" }}
              >
                0.005 Matic
              </Typography>
            </div>
          </div>

          <button onClick={buttonAction} style={buttonStyle}>
            {buttonText}
          </button>

          {/* <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NFTCard;
