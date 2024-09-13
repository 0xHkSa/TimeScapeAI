"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { ReactNode } from "react";
import { client } from "./client";

export default function Providers({ children }: { children: ReactNode }) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}
