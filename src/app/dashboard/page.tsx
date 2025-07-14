"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [status, setStatus] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      router.push("/login");
      return;
    }

    const fetchCandidate = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/candidate/dashboard/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Candidate data:", data);

          setUserInfo({
            name: data.name,
            email: data.email,
          });
          setStatus(data.screening_status);
        }
      } catch (error) {
        console.error("Error fetching candidate data:", error);
        alert("Failed to load candidate data!");
      }
    };

    fetchCandidate();
  }, [router]);

  const getStatusClass = (status: string | null) => {
    if (status === "completed")
      return "bg-blue-100 text-blue-800 border border-blue-400";
    if (status === "accepted")
      return "bg-green-100 text-green-800 border border-green-400";
    if (status === "rejected")
      return "bg-red-100 text-red-800 border border-red-400";
    return "bg-yellow-100 text-yellow-800 border border-yellow-400";
  };

  const handleLogout = () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div className="w-full flex justify-center relative">
      <button
        onClick={handleLogout}
        className="fixed z-10 top-4 right-4 text-sm bg-gradient-to-tr from-red-500 to-red-700 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-all"
      >
        Logout
      </button>

      <div className="relative w-full max-w-2xl h-[80vh] bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col">
        <div className=" flex flex-col space-y-4 mt-2">
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold text-gray-800">
                📋 Application Summary
              </p>
              <p
                className={`inline-block px-3 py-1 text-sm rounded-full font-semibold ${getStatusClass(
                  status
                )}`}
              >
                {status
                  ?.split("_")
                  .map(
                    (word: string) =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(" ")}
              </p>
            </div>
            <p>
              <span className="font-medium text-gray-600">👤 Name:</span>{" "}
              {userInfo.name}
            </p>
            <p>
              <span className="font-medium text-gray-600">📧 Email:</span>{" "}
              {userInfo.email}
            </p>
          </div>
          {(status === "not_started" || status === "rejected") && (
            <Link
              href="/chat"
              className="px-6 py-3 text-center bg-gradient-to-tr from-blue-500 to-blue-700 text-white rounded-full font-semibold shadow hover:scale-105 transition-all"
            >
              Start New Application
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
