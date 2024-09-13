"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum } from "@thirdweb-dev/chains";
import { ReactNode } from "react";
import { client } from "./client";

const clientId1 = client;

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider
      activeChain={Ethereum}
      clientId="clientId1" // Replace with your actual client ID
    >
      {children}
    </ThirdwebProvider>
  );
}
