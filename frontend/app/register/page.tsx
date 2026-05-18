"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "PATIENT",
  });

  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

localStorage.setItem("user", JSON.stringify(data.user));
      setMessage("Registration successful");
    } catch (err) {
      setMessage("Registration failed");
    }
  }

  return (
    <>
  <Navbar />
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 36 }}>Register</h1>

      <form
        onSubmit={handleRegister}
        style={{
          display: "grid",
          gap: 20,
          maxWidth: 500,
          marginTop: 30,
        }}
      >
        <input
          placeholder="First Name"
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
          style={{ padding: 12 }}
        />

        <input
          placeholder="Last Name"
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
          style={{ padding: 12 }}
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={{ padding: 12 }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={{ padding: 12 }}
        />

        <select
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          style={{ padding: 12 }}
        >
          <option value="PATIENT">Patient</option>
          <option value="SPONSOR">Sponsor</option>
          <option value="TRIAL_STAFF">Trial Staff</option>
        </select>

        <button
          type="submit"
          style={{
            padding: 14,
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Register
        </button>

        <p>{message}</p>
      </form>
    </main>
    </>
  );
}