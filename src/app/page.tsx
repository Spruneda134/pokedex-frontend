"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.answer || data.error || "No response");
    } catch (err) {
      setResponse("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-400 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Pokédex</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something about Pokémon..."
          className=" bg-white px-4 py-2 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={handleAsk}
          className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg shadow hover:bg-red-50 transition"
        >
          {loading ? "Loading..." : "Ask"}
        </button>
      </div>

      {response && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md max-w-xl text-gray-800">
          {response}
        </div>
      )}
    </div>
  );
}
