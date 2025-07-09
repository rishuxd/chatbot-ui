"use client";

import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MsgBubble";
import OptionButtons from "./OptionBtn";
import { Send } from "lucide-react";

type Message = {
  sender: "user" | "bot";
  text: string;
  options?: string[];
};

// Update responses to include both text and specific options for each response
const responses: Record<string, { text: string; options: string[] }> = {
  "Interview Schedule": {
    text: "Your interview is scheduled for Thursday at 11:00 AM. Would you like to reschedule?",
    options: ["Upload documents", "Required Documents", "Contact HR"],
  },
  "Upload documents": {
    text: "Please upload your government ID, updated resume, and portfolio if available.",
    options: ["Required Documents", "Contact HR", "Job Description"],
  },
  "Contact HR": {
    text: "You can reach us at hr@company.com or call +91-9876543210.",
    options: ["Interview Schedule", "Job Description", "Company Benefits"],
  },
  "Required Documents": {
    text: "You’ll need a government-issued ID, resume, and portfolio for the interview.",
    options: ["Upload documents", "Contact HR", "Interview Schedule"],
  },
  "Job Description": {
    text: "You're applying for a Software Engineer role. It includes full-stack development and cloud deployment.",
    options: ["Company Benefits", "Interview Schedule", "Contact HR"],
  },
  "Company Benefits": {
    text: "We offer health insurance, hybrid work, wellness reimbursement, and learning budgets.",
    options: ["Job Description", "Contact HR", "Interview Schedule"],
  },
};

function getBotResponse(userInput: string): Message {
  const response = responses[userInput];
  if (response) {
    return {
      sender: "bot",
      text: response.text,
      options: response.options,
    };
  }
  return {
    sender: "bot",
    text: "I'm sorry, I didn't understand that. Please try again or contact HR.",
    options: ["Interview Schedule", "Upload documents", "Contact HR"],
  };
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botReply = getBotResponse(text);
      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Welcome message once
  useEffect(() => {
    const welcomeMsg: Message = {
      sender: "bot",
      text: "Hi! I’m Arya, your hiring assistant 🤖. How can I help you today?",
      options: ["Interview Schedule", "Upload documents", "Contact HR"],
    };
    setMessages([welcomeMsg]);
  }, []);

  return (
    <div className="w-full max-w-2xl h-[80vh] bg-white rounded-xl shadow p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 hide-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <MessageBubble sender={msg.sender} text={msg.text} />
            {msg.sender === "bot" && msg.options && msg.options.length > 0 && (
              <OptionButtons options={msg.options} onSelect={sendMessage} />
            )}
          </div>
        ))}
        {loading && (
          <div className="text-sm italic text-gray-500 animate-pulse">
            Arya is typing…
          </div>
        )}
        <div ref={chatRef} />
      </div>

      <div className="mt-4 flex gap-3 items-center">
        <input
          className="flex-1 border border-gray-300 rounded-full px-5 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all text-base text-gray-900 placeholder-gray-400"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <button
          onClick={() => sendMessage(input)}
          className="flex items-center justify-center bg-gradient-to-tr from-blue-500 to-blue-700 text-white w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full shadow-lg hover:scale-110 hover:from-blue-600 hover:to-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          <Send size={24} strokeWidth={1.5} className="w-6 h-6 mr-1 mb-0.1 my-auto" />
        </button>
      </div>
    </div>
  );
}
