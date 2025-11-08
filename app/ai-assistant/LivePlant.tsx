"use client";

import { useRef, useState } from "react";

const PlantReportCard = ({ data }: { data: string }) => {
  if (!data) return null;

  return (
    <div className="mt-6 w-full max-w-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-white border border-green-300 rounded-2xl shadow-lg p-6 text-gray-800 animate-fadeIn transition-all hover:shadow-emerald-400/40">
      <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center tracking-wide">
        🌿 Plant Health Report
      </h2>
      <div className="text-sm leading-relaxed whitespace-pre-wrap space-y-2">
        {data.split("**").map((segment, index) =>
          index % 2 === 1 ? (
            <strong key={index} className="text-green-800 font-semibold">
              {segment}
            </strong>
          ) : (
            <span key={index}>{segment}</span>
          )
        )}
      </div>
    </div>
  );
};

export default function LivePlant() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string>("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setResult("❌ Unable to access camera. Please allow permissions.");
    }
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );
    if (!blob) return setResult("❌ Failed to capture image.");

    const formData = new FormData();
    formData.append("image", blob);

    setResult("🔍 Analyzing plant... please wait 🌿");

    try {
      const res = await fetch("/api/analyzePlant", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.result || data.error || "⚠️ No result from server.");
    } catch (error) {
      console.error(error);
      setResult("❌ Error analyzing image.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl border border-green-200 shadow-md">
      <h1 className="text-3xl font-bold text-green-700 mb-2 text-center">
        🌱 Live Plant Health Analyzer
      </h1>
      <p className="text-sm text-green-800 text-center mb-4">
        Start your camera, capture a live plant image, and get instant analysis.
      </p>

      <video
        ref={videoRef}
        autoPlay
        className="rounded-2xl shadow-lg w-[320px] h-[240px] border border-green-300 bg-white"
      />

      <div className="flex gap-4 mt-4">
        <button
          onClick={startCamera}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-medium transition-all shadow-md"
        >
          Start Camera
        </button>
        <button
          onClick={captureImage}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl font-medium transition-all shadow-md"
        >
          Capture & Analyze
        </button>
      </div>

      {result && !result.includes("Analyzing") ? (
        <PlantReportCard data={result} />
      ) : (
        <div className="mt-6 text-center text-sm text-green-700 bg-green-50 p-3 rounded-lg w-full max-w-md border border-green-200">
          {result || "No analysis yet."}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
