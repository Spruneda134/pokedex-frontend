"use client";

import { useState } from "react";

export default function Test(){

const [prompt, setPrompt] = useState("");
const [response, setResponse] = useState("");

const handleInput = async () => {
    if (prompt == ""){
        setResponse("where's the prompt bruh");
    } else {
        setResponse(prompt)
    }

};

    return (
        <div className="bg-red-500 bg-cover bg-fixed h-screen text-white">
                        {/* bg-[url(/file-name.jpg)] */}
            <div className="bg-black/90 h-screen content-center">
                <div className="max-w-[1140px] mx-auto items-center text-center flex flex-col">
                    <h1>h1 title</h1>
                    <textarea 
                        onChange={(e) => setPrompt(e.target.value)}
                        value={prompt}
                        placeholder="input something..."
                        className="w-1/2 h-[10rem] border-1 bg-gray-200 text-black rounded-lg p-1"
                    />
                    <button onClick={handleInput} className="w-1/2 px-5 py-2 rounded-lg bg-blue-400 hover:bg-blue-500">button</button>
                    <p>{response}</p>
                </div>
            </div>
        </div>
    );
} 