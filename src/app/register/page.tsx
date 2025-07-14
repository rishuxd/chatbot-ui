"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { error } from "console";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "candidate",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data?.email);
        localStorage.setItem("role", data.role);

        router.push("/dashboard");
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error: any) {
      alert(error.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
      <form onSubmit={handleRegister} className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-5 py-3 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-5 py-3 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-5 py-3 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-tr from-blue-500 to-blue-700 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
