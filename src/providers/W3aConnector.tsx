import { Chain } from "wagmi";
import { CHAIN_NAMESPACES, OPENLOGIN_NETWORK } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";

export function W3aConnector(chains: Chain[]) {

  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0] as string,
  }

  const web3AuthInstance = new Web3AuthNoModal({
    clientId: "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ",
    chainConfig,
    web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_DEVNET,
  });

  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

  const openloginAdapter = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      uxMode: "redirect",
      whiteLabel: {
        appName: "Farcaster Login Demo"
      }
    }
  });
  web3AuthInstance.configureAdapter(openloginAdapter);

  return new Web3AuthConnector({
    chains,
    options: {
      web3AuthInstance,
      loginParams: {
        loginProvider: "google",
      }
    }
  })
}