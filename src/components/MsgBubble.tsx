import React from "react";

type Props = {
  sender: "user" | "bot";
  text: string;
};

export default function MessageBubble({ sender, text }: Props) {
  const isUser = sender === "user";
  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-bold shadow-md">
          <span role="img" aria-label="Bot">🤖</span>
        </div>
      )}
      <div
        className={`px-5 py-3 rounded-2xl max-w-[75%] shadow-md transition-all duration-300 animate-fade-in ${
          isUser
            ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-br-md"
            : "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 rounded-bl-md"
        }`}
      >
        {text}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold shadow-md">
          <span role="img" aria-label="User">🧑</span>
        </div>
      )}
    </div>
  );
}
