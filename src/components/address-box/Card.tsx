import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { getName } from "./getName";
import { Accounts } from "./Accounts";
import { Chain } from "./Chain";
import { ConnectWithSelect } from "./ConnectWithSelect";
import { Status } from "./Status";

interface Props {
  connector: MetaMask | Network;
  chainId: ReturnType<Web3ReactHooks["useChainId"]>;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>;
  provider?: ReturnType<Web3ReactHooks["useProvider"]>;
  accounts?: string[];
}

export function Card({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "20rem",
        padding: "1rem",
        margin: "1rem",
        overflow: "auto",
        border: "1px solid",
        borderRadius: "1rem",
      }}
    >
      {/* <Chain chainId={chainId} /> */}
      {/* <div style={{ marginBottom: "1rem" }}>
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div> */}
      <ConnectWithSelect
        accounts={accounts}
        connector={connector}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </div>
  );
}