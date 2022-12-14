import type { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import type { Web3ReactHooks } from "@web3-react/core";
import { GnosisSafe } from "@web3-react/gnosis-safe";
import type { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { useCallback, useState } from "react";
import { CHAINS, getAddChainParameters, URLS } from "./chains";
import Button from "@mui/material/Button";

function ChainSelect({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number | undefined;
  switchChain: any;
  displayDefault: boolean;
  chainIds: number[];
}) {
  return (
    <select
      value={chainId}
      onChange={(event) => {
        switchChain?.(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      {displayDefault ? <option value={-1}>Default Chain</option> : null}
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
}

export function ConnectWithSelect({
  accounts,
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
}: {
  accounts: ReturnType<Web3ReactHooks["useAccounts"]>;
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe;
  chainId: ReturnType<Web3ReactHooks["useChainId"]>;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
}) {
  const isNetwork = connector instanceof Network;
  const displayDefault = !isNetwork;
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId)
  );

  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 80001 : -1
  );

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) {
        setError(undefined);
        return;
      }

      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) {
        setError(undefined);
        return;
      }

      if (connector instanceof WalletConnect || connector instanceof Network) {
        connector
          .activate(desiredChainId === -1 ? undefined : desiredChainId)
          .then(() => setError(undefined))
          .catch(setError);
      } else {
        connector
          .activate(
            desiredChainId === -1
              ? undefined
              : getAddChainParameters(desiredChainId)
          )
          .then(() => setError(undefined))
          .catch(setError);
      }
    },
    [connector, chainId, setError]
  );

  const onClick = useCallback((): void => {
    setError(undefined);
    if (connector instanceof GnosisSafe) {
      connector
        .activate()
        .then(() => setError(undefined))
        .catch(setError);
    } else if (
      connector instanceof WalletConnect ||
      connector instanceof Network
    ) {
      connector
        .activate(desiredChainId === -1 ? undefined : desiredChainId)
        .then(() => setError(undefined))
        .catch(setError);
    } else {
      connector
        .activate(
          desiredChainId === -1
            ? undefined
            : getAddChainParameters(desiredChainId)
        )
        .then(() => setError(undefined))
        .catch(setError);
    }
  }, [connector, desiredChainId, setError]);

  if (error) {
    return <button onClick={onClick}>Try Again?</button>;
  } else if (isActive) {
    const TruncateAddress = (userAddress: string) => {
      return userAddress.slice(0, 5) + "...." + userAddress.slice(-4);
    };
    return (
      <Button
        variant="contained"
        sx={{
          background:
            "linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)",
          color: "#FFFFFF",
        }}
        onClick={() => {
          if (connector?.deactivate) {
            void connector.deactivate();
          } else {
            void connector.resetState();
          }
        }}
      >
        {accounts && TruncateAddress(accounts[0])}
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        sx={{
          background:
            "linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)",
          color: "#FFFFFF",
        }}
        onClick={
          isActivating
            ? undefined
            : () =>
                connector instanceof GnosisSafe
                  ? void connector
                      .activate()
                      .then(() => setError(undefined))
                      .catch(setError)
                  : connector instanceof WalletConnect ||
                    connector instanceof Network
                  ? connector
                      .activate(
                        desiredChainId === -1 ? undefined : desiredChainId
                      )
                      .then(() => setError(undefined))
                      .catch(setError)
                  : connector
                      .activate(
                        desiredChainId === -1
                          ? undefined
                          : getAddChainParameters(desiredChainId)
                      )
                      .then(() => setError(undefined))
                      .catch(setError)
        }
        disabled={isActivating}
      >
        Connect
      </Button>
    );
  }
}
