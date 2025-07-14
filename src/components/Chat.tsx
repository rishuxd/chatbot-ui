"use client";

import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MsgBubble";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function Chat() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[]
  >([]);
  const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const submitAnswers = async (
    finalAnswers: { question: string; answer: string }[]
  ) => {
    try {
      const userId = localStorage.getItem("user_id");
      const userEmail = localStorage.getItem("email");

      if (!userId || !userEmail) {
        alert("User information not found. Please log in again.");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:5000/api/candidate/submit_screening",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            email: userEmail,
            answers: finalAnswers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit answers!");
      }

      const data = await response.json();
      console.log("Submission successful:", data);
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers. Please try again.");
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/candidate/start_screening",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch questions!");
      }

      const data = await response.json();
      setInterviewQuestions(data.questions);

      if (data.questions.length > 0) {
        const firstQuestion: Message = {
          sender: "bot",
          text: data.questions[0],
        };
        setMessages([firstQuestion]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to load interview questions. Please try again.");
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setAnswers((prev) => [
      ...prev,
      {
        question: interviewQuestions[currentQuestionIndex],
        answer: text,
      },
    ]);
    setInput("");
    setLoading(true);

    setTimeout(async () => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < interviewQuestions.length) {
        const nextQuestion = interviewQuestions[nextIndex];
        const botMsg: Message = {
          sender: "bot",
          text: nextQuestion,
        };
        setMessages((prev) => [...prev, botMsg]);
        setCurrentQuestionIndex(nextIndex);
      } else {
        const finalAnswers = answers.concat({
          question: interviewQuestions[currentQuestionIndex],
          answer: text,
        });

        await submitAnswers(finalAnswers);

        const botMsg: Message = {
          sender: "bot",
          text: "🎉 Thank you! Your responses have been submitted successfully. Our team will get back to you soon. You may return to the dashboard.",
        };
        setMessages((prev) => [...prev, botMsg]);
      }

      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleBack = () => {
    setMessages([]);
    setInput("");
    setLoading(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    router.push("/dashboard");
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handleBack}
        className="fixed top-4 right-4 z-10 text-sm bg-gradient-to-tr from-red-500 to-red-700 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-all"
      >
        Dashboard
      </button>

      <div className="relative w-full max-w-2xl h-[80vh] bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 hide-scrollbar">
          {messages.map((msg, idx) => (
            <div key={`${msg.sender}-${msg.text}-${idx}`}>
              <MessageBubble sender={msg.sender} text={msg.text} />
            </div>
          ))}
          {loading && (
            <div className="text-sm text-gray-500 animate-pulse">
              Bot is typing…
            </div>
          )}
          <div ref={chatRef} />
        </div>

        {/* Input section */}
        <div className="mt-4 flex gap-3 items-center">
          <input
            className="flex-1 border border-gray-300 rounded-full px-5 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all text-base text-gray-900 placeholder-gray-400"
            placeholder="Type your answer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            disabled={answers.length >= interviewQuestions.length}
          />
          <button
            onClick={() => sendMessage(input)}
            className="flex items-center justify-center bg-gradient-to-tr from-blue-500 to-blue-700 text-white w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full shadow-lg hover:scale-110 hover:from-blue-600 hover:to-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={
              loading ||
              !input.trim() ||
              answers.length >= interviewQuestions.length
            }
            aria-label="Send message"
          >
            <Send
              size={24}
              strokeWidth={1.5}
              className="w-6 h-6 mr-1 mb-0.1 my-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
