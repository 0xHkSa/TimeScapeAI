import React from "react";
import { Button } from "@/components/ui/button";
import { getContract, sendTransaction } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";
import { mintTo } from "thirdweb/extensions/erc1155";

export function TestMintToFunc() {
  const account = useActiveAccount();

  const testMintNFT = async () => {
    try {
      if (!account) {
        throw new Error("No active account");
      }
      console.log("Active account:", account.address);

      const contract = getContract({
        address: "0xD37B25c14E4F538A2C17aEC2Ba90a1105a35BC8B",
        chain: baseSepolia,
        client: client,
      });
      console.log("Contract instance created");

      // Dummy metadata
      const dummyMetadata = {
        name: "Test NFT",
        description: "This is a test NFT",
        image: "ipfs://QmYJCJSaWCDyGqBK8YUmiS9jcwysZrqvgukmXdiDBRAaaK/0",
        properties: {
          id: "test-id-123",
          testProperty: "test value",
        },
      };

      const transaction = mintTo({
        contract,
        to: account.address,
        supply: BigInt(1),
        nft: dummyMetadata,
      });

      console.log(
        "Transaction prepared:",
        JSON.stringify(transaction, null, 2)
      );

      console.log("Sending transaction...");
      const tx = await sendTransaction(transaction);
      console.log("Transaction sent:", tx);

      console.log("NFT minted successfully");
      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Minting error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      alert("Failed to mint NFT. Check console for details.");
    }
  };

  return (
    <Button onClick={testMintNFT} disabled={!account}>
      Test Mint NFT
    </Button>
  );
}
