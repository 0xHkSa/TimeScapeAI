"use client";

import { JSX, SVGProps, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { mintTo } from "thirdweb/extensions/erc1155";
import { sendTransaction, getContract } from "thirdweb";
import { useRouter } from "next/navigation";
import { baseSepolia } from "thirdweb/chains";
import { client } from "../../app/client";

interface UploadResponse {
  id: string;
  filename: string;
  s3Url: string;
  generatedImageUrl: string;
  ipfsUri: string;
  uploadedAt: string;
}

const contract = getContract({
  address: "0x916b9b486221d92c8705151E1834d306f44dc3a6",
  chain: baseSepolia,
  client: client,
});

export function UploadComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const router = useRouter();

  const account = useActiveAccount();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploading(true);
    setError(null);
    setUploadComplete(false);
    setUploadResult(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5002/api/images/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data: UploadResponse = await response.json();
      console.log("Upload successful:", data);
      setUploadComplete(true);

      console.log(
        "About to mint NFT with data:",
        JSON.stringify(data, null, 2)
      );
      await mintNFT(data);

      // router.push("/gallery");
      setUploadResult("NFT minted successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const mintNFT = async (uploadData: UploadResponse) => {
    try {
      if (!account) {
        throw new Error("No active account");
      }

      console.log(
        "Minting NFT with data:",
        JSON.stringify(uploadData, null, 2)
      );

      const nftName = uploadData.filename.replace(/\.webp$/, "");
      console.log("NFT Name:", nftName);

      const transaction = mintTo({
        contract,
        to: account.address,
        supply: BigInt(1),
        nft: {
          name: nftName,
          description: "TimeScape AI generated image",
          image: uploadData.ipfsUri,
          attributes: {
            id: uploadData.id,
            s3Url: uploadData.s3Url,
            ipfsUri: uploadData.ipfsUri,
            uploadedAt: uploadData.uploadedAt,
          },
        },
      });

      console.log("Minting transaction prepared:", transaction);

      const transactionHash = await sendTransaction({
        account,
        transaction,
      });
      console.log("Transaction sent. Hash:", transactionHash);

      // You might want to add a delay here before checking the transaction status
      // await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay

      // Optionally, you could add code here to check the transaction status
      // const receipt = await getTransactionReceipt(transactionHash);
      // console.log("Transaction receipt:", receipt);
    } catch (error) {
      console.error("Minting error:", error);
    }
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload Your Photo</CardTitle>
        <CardDescription>
          Help TimeScape AI analyze your photos by uploading them here.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {!file && (
          <label
            htmlFor="file-upload"
            className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary bg-background transition-colors hover:border-primary-foreground"
          >
            <UploadIcon className="h-8 w-8 text-primary" />
            <span className="mt-2 text-sm font-medium text-primary">
              Drag and drop or click to upload
            </span>
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileUpload}
            />
          </label>
        )}
        {file && (
          <div className="flex flex-col items-center justify-center gap-4">
            {uploading && (
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 animate-spin text-primary" />
                <span className="text-sm font-medium">Uploading...</span>
              </div>
            )}
            {uploadComplete && (
              <div className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-green-500" />
                <span className="text-sm font-medium text-green-500">
                  Upload complete!
                </span>
              </div>
            )}
            {uploadComplete && (
              <Link href="/gallery" passHref>
                <Button
                  variant="outline"
                  className="mt-4 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <span className="mr-2">🔍</span>
                  Open Your Window to the Past
                </Button>
              </Link>
            )}
            {error && (
              <div className="text-sm font-medium text-red-500">{error}</div>
            )}
            <div className="flex items-center gap-2">
              <img
                src="/placeholder.svg"
                alt="Uploaded file"
                width={120}
                height={120}
                className="rounded-md object-cover"
                style={{ aspectRatio: "120/120", objectFit: "cover" }}
              />
              <div className="text-left">
                <div className="font-medium">{file.name}</div>
                <div className="text-sm text-muted-foreground">
                  {file.size > 1024 * 1024
                    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                    : `${(file.size / 1024).toFixed(2)} KB`}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
