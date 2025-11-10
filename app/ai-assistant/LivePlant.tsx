"use client";

import { useRef, useEffect, useState } from "react";
import { Camera, Loader2 } from "lucide-react";

// Define the props it accepts
type LivePlantProps = {
  onCapture?: (imageData: string) => void; // For taking a picture
  showShutterButton: boolean; // To show the button
};

export default function LivePlant({
  onCapture,
  showShutterButton,
}: LivePlantProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Start the camera when the component mounts
  useEffect(() => {
    async function setupCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }, // Use the rear camera
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            videoRef.current.onloadeddata = () => {
              setIsLoading(false); // Hide loader when video starts
            };
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          alert("Could not access camera. Please grant permission.");
          setIsLoading(false);
        }
      }
    }
    setupCamera();

    // Cleanup: Stop the camera stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Function to take the picture
  const handleCaptureClick = () => {
    if (!videoRef.current || !canvasRef.current || !onCapture) {
      console.warn("Capture called but onCapture prop is missing.");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Get the image data from the canvas as a high-quality JPEG
    const imageData = canvas.toDataURL("image/jpeg", 0.9); // 90% quality

    // Send the image data (base64 string) back to the parent page
    onCapture(imageData);
  };

  return (
    <div className="relative w-full h-full bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-white/50 animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-cover" // Fills the screen, cropping if needed
        playsInline // Important for iOS
        muted
        autoPlay
      />

      {/* Hidden canvas used for capturing the frame */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Only show the shutter button if 'showShutterButton' is true */}
      {showShutterButton && !isLoading && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={handleCaptureClick}
            className="w-20 h-20 rounded-full bg-white/90 border-4 border-green-500 flex items-center justify-center text-green-600 transition active:scale-90 shadow-lg"
            title="Take Photo"
          >
            <Camera size={36} />
          </button>
        </div>
      )}

      {/* This is for the "Live Analyzer" tab mode */}
      {!showShutterButton && !isLoading && (
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/50 backdrop-blur-sm rounded-lg text-center">
          <p className="text-sm text-white/90">
            Live analysis active. Point your camera at a plant.
          </p>
        </div>
      )}
    </div>
  );
}