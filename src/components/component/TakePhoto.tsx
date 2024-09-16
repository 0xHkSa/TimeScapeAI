import React, { useState, useRef } from "react";
import { Button } from "../ui/button";

interface TakePhotoProps {
  onPhotoTaken: (photoDataUrl: string) => void;
}

const TakePhoto: React.FC<TakePhotoProps> = ({ onPhotoTaken }) => {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = (): void => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const capturePhoto = (): void => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const photoDataUrl = canvas.toDataURL("image/jpeg");
        onPhotoTaken(photoDataUrl);
        stopCamera();
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <video
        ref={videoRef}
        id="camera-feed"
        autoPlay
        playsInline
        className="mb-4"
      ></video>
      <Button
        onClick={() => {
          if (cameraStream) {
            capturePhoto();
          } else {
            startCamera();
          }
        }}
      >
        {cameraStream ? "Capture Photo" : "Start Camera"}
      </Button>
      {cameraStream && (
        <Button onClick={stopCamera} className="ml-2">
          Stop Camera
        </Button>
      )}
    </div>
  );
};

export default TakePhoto;
