import React from "react";
import Content from "./Content";
import { darkTheme, defaultConfig, XellarKitProvider } from "@xellar/kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { optimismSepolia } from "viem/chains";

export const config = defaultConfig({
  appName: "BlockTenderID",
  walletConnectProjectId: import.meta.env.VITE_REOWN_PROJECT_ID,
  xellarAppId: import.meta.env.VITE_XELLAR_APP_ID,
  xellarEnv: "sandbox",
  chains: [optimismSepolia],
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}>
          <Content />
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
