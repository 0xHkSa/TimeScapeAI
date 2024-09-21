"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UploadComponent } from "./UploadComponent";
import { JSX, SVGProps, useEffect } from "react";
import { useState } from "react";

export default function LandingPage() {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraStream(stream);
          const videoElement = document.getElementById(
            "camera-feed"
          ) as HTMLVideoElement;
          if (videoElement) {
            videoElement.srcObject = stream;
          }
          const cameraContainer = document.getElementById("camera-container");
          if (cameraContainer) {
            cameraContainer.style.display = "flex";
          }
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    } else {
      console.error("getUserMedia is not supported on this device");
    }
  };

  useEffect(() => {
    const uploadContainer = document.getElementById("upload-container");
    const body = document.body;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          const isModalVisible = uploadContainer?.style.display === "flex";
          body.style.overflow = isModalVisible ? "hidden" : "";
        }
      });
    });

    if (uploadContainer) {
      observer.observe(uploadContainer, { attributes: true });
    }

    return () => observer.disconnect();
  }, []);

  const toggleUploadModal = (show: boolean) => {
    const uploadContainer = document.getElementById("upload-container");
    if (uploadContainer) {
      uploadContainer.style.display = show ? "flex" : "none";
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-r from-[#6F2DA8] to-[#9370DB] ">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto ">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl mb-6">
                Unlock the Past with TimeScape AI
              </h1>
              <p className="text-lg text-white/80 md:text-xl mt-6 mb-16">
                Capture a photo and let our AI transform it into a stunning
                visual representation of the past.
              </p>
              <div className="flex flex-col items-center">
                <Button
                  size="lg"
                  className="px-8 py-3 rounded-full h-16 text-xl mb-6"
                  onClick={() => toggleUploadModal(true)}
                >
                  Upload Photo
                </Button>
              </div>
              <div
                id="upload-container"
                className="hidden fixed inset-0 bg-black bg-opacity-50 justify-center items-center z-50"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    toggleUploadModal(false);
                  }
                }}
              >
                <div className="max-h-[90vh] overflow-y-auto">
                  <UploadComponent />
                </div>
              </div>
              <div>
                <Button
                  size="lg"
                  className="px-8 py-3 rounded-full h-16 text-xl"
                  onClick={startCamera}
                >
                  Take a Photo
                </Button>
              </div>
              <div
                id="camera-container"
                className="hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    e.currentTarget.style.display = "none";
                    if (cameraStream) {
                      cameraStream.getTracks().forEach((track) => track.stop());
                      setCameraStream(null);
                    }
                  }
                }}
              >
                <div className="bg-white p-6 rounded-lg">
                  <video
                    id="camera-feed"
                    autoPlay
                    playsInline
                    className="mb-4"
                  ></video>
                  <Button
                    onClick={() => {
                      const videoElement = document.getElementById(
                        "camera-feed"
                      ) as HTMLVideoElement;
                      const canvas = document.createElement("canvas");
                      canvas.width = videoElement.videoWidth;
                      canvas.height = videoElement.videoHeight;
                      canvas.getContext("2d")?.drawImage(videoElement, 0, 0);
                      const imageDataUrl = canvas.toDataURL("image/jpeg");
                      // Here you can handle the captured image data
                      console.log("Captured image:", imageDataUrl);
                      // Close the camera modal and stop the stream
                      const cameraContainer =
                        document.getElementById("camera-container");
                      if (cameraContainer) {
                        cameraContainer.style.display = "none";
                      }
                      if (cameraStream) {
                        cameraStream
                          .getTracks()
                          .forEach((track) => track.stop());
                        setCameraStream(null);
                      }
                    }}
                  >
                    Capture Photo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="w-full py-12 sm:py-24 md:py-32 lg:py-40 xl:py-48"
        >
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="https://replicate.delivery/yhqm/nnQQvx7MILa7EdnCgXImhP80phx5rzi7tNsbM6w9OvPoOfuJA/out-0.webp"
                  width={600}
                  height={400}
                  alt="TimeScape AI Sample"
                  className="w-full h-64 object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Ancient Rome</h3>
                  <p className="text-muted-foreground">
                    Discover the grandeur of ancient Rome through our AI-powered
                    transformation.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="https://replicate.delivery/yhqm/oGiRj2k5NWalJNavgss9lfdJtfSMK4Tn8om2OGiAZMDZ98dTA/out-0.png"
                  width={600}
                  height={400}
                  alt="TimeScape AI Sample"
                  className="w-full h-64 object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Medieval Europe</h3>
                  <p className="text-muted-foreground">
                    Step back in time and explore the rich history of medieval
                    Europe.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="https://replicate.delivery/yhqm/okvcpPCj9zqEH12vEOpAEQvPgqPEfvykb1Okcjvzge0798dTA/out-0.png"
                  width={600}
                  height={400}
                  alt="TimeScape AI Sample"
                  className="w-full h-64 object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Ancient Egypt</h3>
                  <p className="text-muted-foreground">
                    Uncover the mysteries of ancient Egypt through our
                    AI-powered transformation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Unlock the Past with TimeScape AI
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  TimeScape AI is a revolutionary application that allows you to
                  capture a photo and transform it into a stunning visual
                  representation of the past. Our advanced AI technology
                  analyzes the image and reconstructs the scene based on
                  historical data, bringing the past to life in vivid detail.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Capabilities
                </div>
                <ul className="grid gap-4 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">
                        Historical Accuracy
                      </h3>
                      <p>
                        Our AI-powered technology ensures historical accuracy in
                        the reconstructed scenes, transporting you back in time.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">Stunning Visuals</h3>
                      <p>
                        Experience the past in vivid detail with our
                        high-quality, visually stunning transformations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">
                        Intuitive Interface
                      </h3>
                      <p>
                        Our user-friendly interface makes it easy to capture,
                        transform, and explore the past.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer
        id="contact"
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
      >
        <p className="text-xs text-muted-foreground">
          &copy; 2024 TimeScape AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CircleCheckIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
