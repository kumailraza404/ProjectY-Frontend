import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import {
  createAlchemyWeb3,
  GetNftMetadataParams,
  Nft,
} from "@alch/alchemy-web3";
import { Web3Callback } from "@alch/alchemy-web3/dist/esm/types";
import { Network, Alchemy } from "@alch/alchemy-sdk";
import PlaceBid, { BidsInterface } from "../modals/placeBid";

const web3 = createAlchemyWeb3(
  "https://eth-rinkeby.alchemyapi.io/v2/38niqT-HbTmDsjLdh597zVlW0c94wp0v"
);
interface NFTCardProps {
  owner: string;
  bid: number;
  buttonText: string;
  buttonAction(): void;
  buttonAction2?(r: string, t: string, b: BidsInterface): void;
  buttonDisabled?: boolean;
  nftContractAddress?: string;
  nftTokenId?: string;
  entryId: string;
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
const buttonStyleDisable = {
  background: "grey",
  marginTop: "10px",
  border: "none",
  color: "white",
  fontSize: "18px",
  height: "40px",
  borderRadius: "10px",
};

const CollectionCard: React.FunctionComponent<NFTCardProps> = ({
  owner,
  bid,
  buttonText,
  buttonDisabled = false,
  nftContractAddress,
  nftTokenId,
  entryId,
}) => {
  const [openPlaceBidModal, setOpenPlaceBidModal] = React.useState(false);

  const [nftImage, setNftImage] = React.useState("");
  const [nftName, setNftName] = React.useState("");
  const getnftMetadata = async () => {
    if (nftContractAddress) {
      const nftMetadata = await web3.alchemy.getNftMetadata({
        contractAddress: nftContractAddress ? nftContractAddress : "",
        tokenId: nftTokenId ? nftTokenId : "",
      });
      // console.log("nftMetadata", nftMetadata)
      setNftImage(
        nftMetadata.metadata?.image ? nftMetadata.metadata?.image : ""
      );
      setNftName(nftMetadata.title);
    }
  };

  React.useEffect(() => {
    getnftMetadata();
  }, []);
  return (
    <Card sx={{ maxWidth: 345 }} style={cardStyle}>
      <CardActionArea style={{ padding: 20 }}>
        <CardMedia
          component="img"
          height="340"
          image={nftImage}
          alt="Azuki"
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
                <span>@</span>
                {owner?.slice(0, 6)}...
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                color="white"
                style={{ fontSize: "18px", fontWeight: "700" }}
              >
                {nftName}
              </Typography>
            </div>

            {bid !== 0 && (
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
            )}
          </div>

          <Button
            disabled={buttonDisabled}
            onClick={() => setOpenPlaceBidModal(true)}
            style={buttonDisabled ? buttonStyleDisable : buttonStyle}
          >
            {buttonText}
          </Button>
        </CardContent>
      </CardActionArea>
      <PlaceBid
        open={openPlaceBidModal}
        setOpen={() => setOpenPlaceBidModal(true)}
        handleClose={() => setOpenPlaceBidModal(false)}
        image={nftImage}
        remainingTime={"1.5"}
        highestBid={": string;"}
        entryId={entryId}
        name={nftName}
        sellerAddress={owner}
      />
    </Card>
  );
};

export default CollectionCard;
