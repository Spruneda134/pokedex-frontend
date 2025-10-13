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
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Pokedex</h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something about Pokémon..."
        style={{ padding: "0.5rem", width: "300px", marginRight: "0.5rem" }}
      />

      <button onClick={handleAsk} style={{ padding: "0.5rem 1rem" }}>
        {loading ? "Loading..." : "Ask"}
      </button>

      {response && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            maxWidth: "600px",
          }}
        >
          {response}
        </div>
      )}
    </div>
  );
}
