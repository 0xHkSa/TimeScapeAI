"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function UploadComponent() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const handleFileUpload = (e: any) => {
    setFile(e.target.files[0]);
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
    }, 2000);
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

function CheckIcon(props) {
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

function UploadIcon(props) {
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
