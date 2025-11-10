"use client";
export const dynamic = 'force-dynamic';

import { useState, useRef, useEffect, ChangeEvent } from "react"; // Added ChangeEvent
import {
  Loader2,
  Send,
  Bot,
  Leaf,
  User,
  Camera,
  MessageCircle,
  X,
  ArrowLeft,
  ImageIcon, // <-- ADDED
} from "lucide-react";
import Link from "next/link";
import LivePlant from "./LivePlant"; // Make sure this is in the same folder

type Message = {
  sender: "user" | "ai";
  text: string;
  image?: string;
};

export default function AIAssistantPage() {
  const [mode, setMode] = useState<"chat" | "analyzer">("chat");
  
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "🌿 Namaste! I’m your Vrindavan AI assistant. You can chat with me or switch to Live Analyzer.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [liveInput, setLiveInput] = useState("");
  
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [showCameraModal, setShowCameraModal] = useState(false);

  useEffect(() => {
    if (mode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, mode]);

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    // ... (rest of the function is unchanged) ...
    const newMessage: Message = { sender: "user", text: chatInput };
    setChatMessages((prev) => [...prev, newMessage]);
    setChatInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/vrindavan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "🤖 No response received." },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to reach AI service. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLiveSend = async () => {
    if (!liveInput.trim()) return;
    // ... (rest of the function is unchanged) ...
    const query = liveInput;
    setLiveInput("");
    alert(`Sending query to Live AI: "${query}"\n(You would implement this API call)`);
  };

  // --- NEW UNIFIED IMAGE HANDLER ---
  // This function now takes a File object, gets a preview, and sends it.
  const handleImageUpload = async (file: File) => {
    setLoading(true);

    // 1. Create base64 preview for the chat window
    const base64data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // 2. Create FormData to send the actual file
    const formData = new FormData();
    formData.append("image", file);

    // 3. Add to chat messages
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: "📸 Uploaded a plant image for analysis.",
        image: base64data, // Use base64 string for preview
      },
    ]);

    // 4. Send to API
    try {
      const res = await fetch("/api/vrindavan", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "No response from server." },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Error analyzing image. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Handler for the "Take Photo" modal ---
  const handleCameraCapture = async (imageData: string) => {
    setShowCameraModal(false);
    // 1. Convert base64 string from camera to a File
    const res = await fetch(imageData);
    const blob = await res.blob();
    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
    // 2. Call the unified upload function
    handleImageUpload(file);
  };

  // --- NEW: Handler for the "Upload File" input ---
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    // Clear the input value to allow re-uploading the same file
    if (e.target) {
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white flex flex-col items-center relative">
      <div className="w-full max-w-3xl flex flex-col bg-white/80 backdrop-blur-md border border-green-100 rounded-3xl shadow-xl h-[calc(100vh-5rem)] mt-6 overflow-hidden">
        
        {/* Header with Back Button */}
        <div className="relative flex items-center justify-center gap-3 py-4 border-b border-green-100 bg-gradient-to-r from-green-100 to-emerald-100">
          <Link
            href="/"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-green-700 hover:bg-green-200/50 transition-colors"
            title="Back to Home"
          >
            <ArrowLeft size={20} />
          </Link>
          <Leaf className="text-green-600 w-6 h-6 animate-pulse" />
          <h1 className="text-xl sm:text-2xl font-semibold text-green-800">
            Vrindavan AI Assistant
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center bg-white border-b border-green-100 text-sm sm:text-base">
          <button
            onClick={() => setMode("chat")}
            className={`flex items-center gap-2 px-4 sm:px-5 py-3 font-medium transition-all ${
              mode === "chat"
                ? "text-green-700 border-b-2 border-green-600 bg-green-50"
                : "text-gray-500 hover:text-green-700 hover:bg-green-50/50"
            }`}
          >
            <MessageCircle size={18} /> Chat Assistant
          </button>
          <button
            onClick={() => setMode("analyzer")}
            className={`flex items-center gap-2 px-4 sm:px-5 py-3 font-medium transition-all ${
              mode === "analyzer"
                ? "text-green-700 border-b-2 border-green-600 bg-green-50"
                : "text-gray-500 hover:text-green-700 hover:bg-green-50/50"
            }`}
          >
            <Camera size={18} /> Live Analyzer
          </button>
        </div>

        {/* Chat Mode */}
        {mode === "chat" && (
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 bg-gradient-to-b from-white to-green-50 pb-24">
            {/* ... (Message mapping logic is unchanged) ... */}
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 animate-fadeIn ${
                  msg.sender === "ai" ? "justify-start" : "justify-end"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center shadow-sm">
                    <Bot size={18} />
                  </div>
                )}
                <div
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Uploaded preview"
                      className="w-40 h-40 object-cover rounded-xl border border-green-200 shadow-md mb-2 transition-transform hover:scale-[1.03]"
                    />
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm shadow-md leading-relaxed whitespace-pre-line transition-all duration-200 hover:scale-[1.G02] hover:shadow-green-200/80 ${
                      msg.sender === "ai"
                        ? "bg-green-100 text-green-800 rounded-bl-none hover:bg-green-200"
                        : "bg-blue-100 text-blue-800 rounded-br-none hover:bg-blue-200"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/\n/g, "<br/>")
                        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                        .replace(/\|\|/g, "<br/>"),
                    }}
                  />
                </div>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shadow-sm">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-green-700 animate-fadeIn">
                <Loader2 className="animate-spin" size={18} />
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Live Analyzer Mode */}
        {mode === "analyzer" && (
          <div className="flex-1 bg-black relative overflow-hidden">
            <LivePlant showShutterButton={false} />
            <div className="absolute bottom-0 left-0 w-full z-10 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              {/* ... (Live input bar is unchanged) ... */}
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-green-200 shadow-2xl px-4 py-3 rounded-full max-w-xl mx-auto">
                <input
                  className="flex-1 bg-transparent border-none outline-none text-green-900 placeholder:text-green-600 px-2"
                  placeholder="Ask about what you see..."
                  value={liveInput}
                  onChange={(e) => setLiveInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLiveSend()}
                />
                <button 
                  onClick={handleLiveSend}
                  className="p-2 bg-green-600 text-white rounded-full transition hover:bg-green-700 active:scale-90"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Show Input Bar ONLY for chat mode */}
      {mode === "chat" && (
        <div className="fixed bottom-0 left-0 w-full z-50 px-3 sm:px-6 pb-[env(safe-area-inset-bottom)]">
          {/* --- MODIFIED CHAT BAR --- */}
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-green-200 shadow-2xl px-4 py-3 rounded-t-3xl max-w-3xl mx-auto transition-all duration-300 hover:shadow-green-200/60">
            {/* Take Photo Button */}
            <button
              onClick={() => setShowCameraModal(true)}
              className="p-2 bg-white/60 hover:bg-green-100 text-green-700 rounded-xl cursor-pointer transition"
              title="Take photo"
            >
              <Camera size={18} />
            </button>
            
            {/* Upload Image Button */}
            <label
              className="p-2 bg-white/60 hover:bg-green-100 text-green-700 rounded-xl cursor-pointer transition"
              title="Upload image"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect} // <-- NEW HANDLER
              />
              <ImageIcon size={18} />
            </label>

            {/* Text Input */}
            <input
              className="flex-1 bg-transparent border-none outline-none text-green-900 placeholder:text-green-600 px-2 text-sm sm:text-base"
              placeholder="Ask something about your plant..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
            />
            {/* Send Button */}
            <button
              onClick={handleChatSend}
              disabled={loading}
              className={`p-2 rounded-xl transition-all ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-green-300/50 scale-100 hover:scale-105"
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Full-screen "Capture" Modal (for chat) */}
      {showCameraModal && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-fadeIn">
          <LivePlant
            onCapture={handleCameraCapture} // <-- NEW HANDLER
            showShutterButton={true}
          />
          <button
            onClick={() => setShowCameraModal(false)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition"
            title="Close camera"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}