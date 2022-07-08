import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { hooks } from "../../components/address-box/metaMask";

const { useAccounts } = hooks;

const web3 = createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/38niqT-HbTmDsjLdh597zVlW0c94wp0v"
);

const MyNft = () => {
  const [nftsOwned, setNftsOwned] = useState<any>();
  const accounts = useAccounts();

  useEffect(() => {
    getUserNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const getUserNFTs = async () => {
    if (accounts) {
      console.log("fetching user nfts");
      //   const nfts = await web3.alchemy.getNfts({
      //     owner: "0xDAA50a02340cBcFA1a6F4c02765430Ffe411b188",
      //   });
      //   console.log("fetching user nfts", nfts);

      //   setNftsOwned(nfts);
    }
  };

  return <></>;
};

export default MyNft;
