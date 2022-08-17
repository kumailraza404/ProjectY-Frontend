import * as React from "react";
import { Grid, Typography, Box, Modal, Input } from "@mui/material";
import NFT from "../../assets/nft2.png";
import MaticLogo from "../../assets/matic.svg";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Contract, ethers } from "ethers";
import { ABI, Address } from "../../constants";
import { hooks } from "../address-box/metaMask";


const web3 = createAlchemyWeb3(
  "https://eth-rinkeby.alchemyapi.io/v2/38niqT-HbTmDsjLdh597zVlW0c94wp0v"
);
interface PayInstallmentProps {
  open: boolean;
  setOpen(value: boolean): void;
  nftContractAddress?: string;
  nftTokenId?: string;
  amount?: string;
  totalInstallment: number;
  entryId: any;
  // image: string;
  // title: string;
  // remainingTime: string;
  // highestBid: string;
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

const PayInstallment: React.FunctionComponent<PayInstallmentProps> = ({
  open,
  setOpen,
  nftContractAddress,
  nftTokenId,
  amount,
  totalInstallment,
  entryId
}) => {
  const handleClose = () => setOpen(false);
  const [input, setInput] = React.useState("");

  const [nftImage, setNftImage] = React.useState("")
  const [nftTitle, setNftTitle] = React.useState("")
  
  const getnftMetadata = async () =>{
    
    if(nftContractAddress){
      console.log("getNFTmetadata running");
      const nftMetadata = await web3.alchemy.getNftMetadata({contractAddress:nftContractAddress ? nftContractAddress : "" , 
      tokenId:nftTokenId ? nftTokenId : ""}); 
      console.log("nftMetadata", nftMetadata)
      setNftTitle(nftMetadata.metadata?.title ?  nftMetadata.metadata?.title : "")
      setNftImage(nftMetadata.metadata?.image ?  nftMetadata.metadata?.image : "")
    } 
    

  }
  React.useEffect(()=>{
    getnftMetadata();
  },[])

  const getCalculatedAmount = (amount:any): string =>{
    let res = ethers.utils.formatEther(String((parseInt(amount ? amount : "0",16))))
    console.log(res,"cal amount",totalInstallment)
    // console.log((res / totalInstallment))
    return String(parseFloat(res) / totalInstallment)
  }
    
  const {  useProvider } = hooks;
  const provider = useProvider();
  const handleSubmit = async () =>{
    console.log("handle submit enrey ID", entryId)
    const protocolContract = new Contract(Address, ABI, provider?.getSigner());
    await protocolContract.payInstallment(
      entryId,
      {gasLimit: 350000, value: input}
    )
  }

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
            Clear Your Installments
          </Typography>

          <Grid container>
            <Grid container item xs={12} md={7} flexDirection="column">
              <Typography fontSize={20} color="primary" mt={"40px"}>
                Next Installment Pending{" "}
                <span style={{ fontWeight: "700" }}>{getCalculatedAmount(amount)} Matic</span>
              </Typography>
              <Grid container mt={"30px"}>
                <Grid container item xs={12} md={3}>
                  <Typography
                    id="modal-modal-title"
                    fontSize={16}
                    color="primary"
                    mt={1}
                  >
                    Enter Amount
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
                Note:In case you fail to clear your installments before due date
                you may no longer have this nft
              </Typography>

              <button style={buttonStyle} onClick={handleSubmit}>
                <Typography fontSize={20} color="Primary">
                  Pay Installment
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
              <img src={nftImage} style={{ height: "200px", width: "200px" }} />
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography fontSize={20} color="primary" fontWeight={700}>
                  {nftTitle}
                </Typography>
              </div>

              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "4px 0px",
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
                  margin: "4px 0px",
                }}
              >
                <Typography fontSize={14} color="primary">
                  Installment Plan
                </Typography>
                <Typography fontSize={14} color="secondary">
                  3 Months
                </Typography>
              </div>

              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "4px 0px",
                }}
              >
                <Typography fontSize={14} color="primary">
                  Remaining Amount
                </Typography>
                <Typography fontSize={14} color="secondary">
                  100 Matic
                </Typography>
              </div>

              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "4px 0px",
                }}
              >
                <Typography fontSize={14} color="primary">
                  Cleared Amount
                </Typography>
                <Typography fontSize={14} color="secondary">
                  34 Matic
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default PayInstallment;
