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
      const nfts = await web3.alchemy.getNfts({
        owner: accounts[0],
      });
      setNftsOwned(nfts);
    }
  };

  return <></>;
};

export default MyNft;
