"use client";

import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { JSX, SVGProps } from "react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { client } from "@/app/client";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
        aria-label="Home"
      >
        <CameraIcon className="h-6 w-6 mr-2" />
        <span className="text-lg font-semibold">Time Scape AI</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {navItems.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              pathname === href ? "text-primary" : ""
            }`}
            prefetch={false}
            onClick={(e) => {
              if (href.startsWith("/#") && pathname === "/") {
                e.preventDefault();
                const element = document.getElementById(href.substring(2));
                element?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {name}
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
