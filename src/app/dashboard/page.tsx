"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { dummy } from "@/data/dummy";

type QA = {
  question: string;
  answer: string;
  justification: string;
  score: number;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  average_score: number;
  status: string;
  completed_at: string;
  questions_answers: QA[];
};

export default function Dashboard() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const router = useRouter();

  useEffect(() => {
    setCandidate(dummy);
  }, []);

  const getStatusClass = (status: string) => {
    if (status === "Accepted")
      return "bg-green-100 text-green-800 border border-green-400";
    if (status === "Rejected")
      return "bg-red-100 text-red-800 border border-red-400";
    return "bg-yellow-100 text-yellow-800 border border-yellow-400";
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const handleTest = () => {
    if (!candidate) {
      setCandidate(dummy);
    } else {
      setCandidate(null);
    }
  };

  return (
    <div className="w-full flex justify-center relative">
      <button
        onClick={handleLogout}
        className="fixed z-10 top-4 right-4 text-sm bg-gradient-to-tr from-red-500 to-red-700 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-all"
      >
        Logout
      </button>

      <button
        onClick={handleTest}
        className="fixed z-10 top-16 right-4 text-sm bg-gradient-to-tr from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-all"
      >
        Toggle Data
      </button>

      <div className="relative w-full max-w-2xl h-[80vh] bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 hide-scrollbar mt-2">
          {!candidate ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-6 p-4">
              <p className="text-xl text-gray-700">No application found.</p>
              <Link
                href="/chat"
                className="px-6 py-3 bg-gradient-to-tr from-blue-500 to-blue-700 text-white rounded-full font-semibold shadow hover:scale-105 transition-all"
              >
                Start New Application
              </Link>
            </div>
          ) : (
            <>
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-2">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  📋 Application Summary
                </p>
                <p>
                  <span className="font-medium text-gray-600">👤 Name:</span>{" "}
                  {candidate.name}
                </p>
                <p>
                  <span className="font-medium text-gray-600">📧 Email:</span>{" "}
                  {candidate.email}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    📅 Submitted At:
                  </span>{" "}
                  {new Date(candidate.completed_at).toLocaleString()}
                </p>
                <p
                  className={`inline-block mt-4 px-3 py-1 text-sm rounded-full font-semibold ${getStatusClass(
                    candidate.status
                  )}`}
                >
                  {candidate.status}
                </p>
              </div>

              <div className="space-y-4">
                {candidate.questions_answers.map((qa, id) => (
                  <div
                    key={`qa-${qa.question}`}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <p className="font-semibold text-blue-600 mb-1">
                      Q{id + 1}: {qa.question}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium text-gray-600">Answer:</span>{" "}
                      {qa.answer}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium text-gray-600">
                        Feedback:
                      </span>{" "}
                      <em>{qa.justification}</em>
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Score:</span>{" "}
                      {qa.score}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
