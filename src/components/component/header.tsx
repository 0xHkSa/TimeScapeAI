"use client";

import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { JSX, SVGProps } from "react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { client } from "@/app/client";

interface HeaderProps {
  client: any; // Replace 'any' with the correct type from thirdweb
  wallets: any[]; // Replace 'any[]' with the correct type from thirdweb
}

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "email", "passkey"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
];

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <CameraIcon className="h-6 w-6" />
        <span className="sr-only">TimeScape AI</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {["Features", "Gallery", "About", "Contact"].map((item) => (
          <Link
            key={item}
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            {item}
          </Link>
        ))}
        <ConnectButton
          client={client}
          wallets={wallets}
          connectButton={{
            label: "Log in",
            className: "px-8 py-3 rounded-full text-sm font-medium",
            style: {
              backgroundColor: "#1d1d38",
              color: "white",
              borderRadius: "9999px",
            },
          }}
          connectModal={{
            size: "compact",
            title: "Sign in",
            showThirdwebBranding: false,
          }}
        />
      </nav>
    </header>
  );
}

function CameraIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
