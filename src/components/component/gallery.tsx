"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useActiveAccount } from "thirdweb/react";

export default function Gallery() {
  const account = useActiveAccount();
  console.log(account);
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <main className="flex-1 grid gap-6 p-6 md:p-10">
        {!account ? (
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Gallery</h2>
              <Link
                href="#"
                className="text-primary hover:underline"
                prefetch={false}
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
              {[...Array(10)].map((_, i) => (
                <Link
                  key={i}
                  href="#"
                  className="group relative overflow-hidden rounded-lg"
                  prefetch={false}
                >
                  <img
                    src="/placeholder.svg"
                    alt={`Image ${i + 1}`}
                    width="300"
                    height="300"
                    className="w-full h-full object-cover transition-all group-hover:scale-110"
                    style={{ aspectRatio: "300/300", objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MaximizeIcon className="w-6 h-6 text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Connect your wallet to view your gallery
            </h2>
            <Button>Connect Wallet</Button>
          </div>
        )}

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Explore</h2>
            <Link
              href="#"
              className="text-primary hover:underline"
              prefetch={false}
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 mt-6">
            <div className="flex items-center gap-4 bg-muted rounded-lg p-4">
              <SearchIcon className="w-6 h-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for image prompts..."
                className="flex-1 bg-transparent border-0 focus:ring-0"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <Card key={i} className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <img
                      src="/placeholder.svg"
                      alt={`Prompt ${i + 1}`}
                      width="200"
                      height="200"
                      className="w-full h-full object-cover rounded-t-lg"
                      style={{ aspectRatio: "200/200", objectFit: "cover" }}
                    />
                  </CardContent>
                  <CardFooter className="bg-muted text-muted-foreground p-3 rounded-b-lg">
                    <div className="font-medium">Prompt {i + 1}</div>
                    <div className="text-sm">
                      A detailed description of the image prompt.
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MaximizeIcon(props) {
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
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
