"use client";

import { useState, useRef } from "react"; // Import useRef
import { motion, AnimatePresence } from "framer-motion";

export default function Pokedex() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [booted, setBooted] = useState(false);
  
  // Ref to keep track of the current audio instance
  const audioRef = useRef(null);

  const handleAsk = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse("");

    // Stop any currently playing audio before starting new request
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ask`, {
      // const res = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      
      setResponse(data.answer || data.error || "No response");

      // --- Play Audio Logic ---
      if (data.audio) {
        // Create audio from base64 string
        const audioSrc = `data:audio/mp3;base64,${data.audio}`;
        const newAudio = new Audio(audioSrc);
        
        audioRef.current = newAudio;
        newAudio.play().catch(e => console.error("Audio play failed:", e));
      }

    } catch (err) {
      console.error(err);
      setResponse("⚠️ Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // Helper to stop audio manually
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-red-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Metallic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-800/60 via-transparent to-red-600/40 pointer-events-none" />

      {/* Top lights */}
      <div className="absolute top-6 left-8 flex gap-3">
        <motion.div
          animate={{ opacity: loading ? [1, 0.3, 1] : 1 }} // Pulse while loading
          transition={{ repeat: Infinity, duration: loading ? 0.5 : 0 }}
          className="w-10 h-10 bg-blue-400 rounded-full border-4 border-white shadow-[0_0_20px_5px_rgba(96,165,250,0.7)]"
        />
        <div className="w-5 h-5 bg-yellow-300 rounded-full border-2 border-white shadow-inner" />
        <div className="w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-inner" />
      </div>

      {/* Pokédex body */}
      <div className="bg-red-700 border-8 border-red-900 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl mx-auto mt-15">
        
        {/* Left side: Controls */}
        <div className="bg-red-800 flex-1 p-6 relative flex flex-col justify-center border-b-8 md:border-b-0 md:border-r-8 border-red-900 min-h-[280px] h-auto">
          <div className="text-white text-2xl font-bold mb-4 text-center drop-shadow-md">
            Pokédex v2.0
          </div>

          {!booted ? (
            <button
              onClick={() => setBooted(true)}
              className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full mx-auto mt-8 shadow-lg hover:bg-yellow-300 transition active:scale-95"
            >
              Power On
            </button>
          ) : (
            <div className="flex flex-col gap-3 items-center mt-6">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()} // Allow Enter key
                placeholder="Who is Pikachu?"
                className="bg-gray-100 text-gray-800 font-mono px-4 py-2 rounded-lg w-56 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div className="flex gap-2">
                <button
                    onClick={handleAsk}
                    disabled={loading}
                    className="bg-green-400 hover:bg-green-300 disabled:bg-green-800 text-black font-bold px-5 py-2 rounded-lg shadow-lg transition active:scale-95"
                >
                    {loading ? "Scanning..." : "Search"}
                </button>
                
                {/* Stop Audio Button */}
                <button
                    onClick={stopAudio}
                    className="bg-red-500 hover:bg-red-400 text-white font-bold px-3 py-2 rounded-lg shadow-lg transition active:scale-95"
                    title="Stop Audio"
                >
                    ⏹
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Screen */}
        <div className="bg-gray-900 flex-1 border-t-8 md:border-t-0 md:border-l-8 border-red-900 p-6 flex items-center justify-center h-auto">
          <div className="w-full border-4 border-gray-700 rounded-lg p-6 bg-gray-950/90 text-green-400 font-mono min-h-[250px] relative">
            
            {/* Speaker Grid Visual */}
            <div className="absolute bottom-2 right-2 flex gap-1 opacity-50">
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            </div>

            <AnimatePresence mode="wait">
              {!booted ? (
                <motion.div
                  key="boot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-full text-xl"
                >
                  <span className="text-green-600">SYSTEM OFFLINE</span>
                </motion.div>
              ) : loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-2"
                >
                  <div className="animate-pulse text-lg">Analysing subject...</div>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="response"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre-wrap leading-relaxed text-green-300 h-full overflow-y-auto custom-scrollbar"
                >
                  {response || "Awaiting input..."}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}