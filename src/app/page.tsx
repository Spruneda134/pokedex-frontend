"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Pokedex() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [booted, setBooted] = useState(false);

  const handleAsk = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.answer || data.error || "No response");
    } catch {
      setResponse("⚠️ Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-red-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Metallic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-800/60 via-transparent to-red-600/40 pointer-events-none" />

      {/* Top lights */}
      <div className="absolute top-6 left-8 flex gap-3">
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-10 h-10 bg-blue-400 rounded-full border-4 border-white shadow-[0_0_20px_5px_rgba(96,165,250,0.7)]"
        ></motion.div>
        <div className="w-5 h-5 bg-yellow-300 rounded-full border-2 border-white shadow-inner"></div>
        <div className="w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-inner"></div>
      </div>

      {/* Pokédex body */}
      <div className="bg-red-700 border-8 border-red-900 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-5xl w-full">
        {/* Left */}
        <div className="bg-red-800 flex-1 p-6 relative flex flex-col justify-center border-r-8 border-red-900">
          <div className="text-white text-2xl font-bold mb-4 text-center drop-shadow-md">
            Pokédex v1.0
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
                placeholder="Enter Pokémon name..."
                className="bg-gray-100 text-gray-800 font-mono px-4 py-2 rounded-lg w-56 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <button
                onClick={handleAsk}
                className="bg-green-400 hover:bg-green-300 text-black font-bold px-5 py-2 rounded-lg shadow-lg transition active:scale-95"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="bg-gray-900 flex-1 border-l-8 border-red-900 relative">
          <div className="absolute inset-0 border-4 border-gray-700 rounded-lg m-6">
            <div className="bg-gray-950/90 h-full w-full rounded-md p-6 text-green-400 font-mono">
              <AnimatePresence>
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
                    <div className="animate-pulse text-lg">Accessing data...</div>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap leading-relaxed text-green-300"
                  >
                    {response || "Awaiting input..."}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="mt-6 flex gap-4">
        <button className="w-10 h-10 bg-blue-500 rounded-full shadow-lg border-2 border-black active:scale-95 transition"></button>
        <button className="w-10 h-10 bg-red-500 rounded-full shadow-lg border-2 border-black active:scale-95 transition"></button>
        <button className="w-10 h-10 bg-yellow-500 rounded-full shadow-lg border-2 border-black active:scale-95 transition"></button>
      </div>
    </div>
  );
}
