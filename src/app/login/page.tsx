"use client";

import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    redirect("/dashboard");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-5 py-3 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-5 py-3 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-tr from-blue-500 to-blue-700 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
