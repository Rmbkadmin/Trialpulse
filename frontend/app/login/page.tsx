"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

     localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful");
    } catch (err) {
      setMessage("Login failed");
    }
  }

  return (
    <>
  <Navbar />
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 36 }}>Login</h1>

      <form
        onSubmit={handleLogin}
        style={{
          display: "grid",
          gap: 20,
          maxWidth: 400,
          marginTop: 30,
        }}
      >
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 12 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 12 }}
        />

        <button
          type="submit"
          style={{
            padding: 14,
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Login
        </button>

        <p>{message}</p>
      </form>
    </main>
    </>
  );
}