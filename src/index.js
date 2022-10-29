import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: "m-f_iulGAvJHUCYNwUsiSFiYe-IzChiK" }),
  publicProvider(),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
root.render(
  <StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </StrictMode>
);
