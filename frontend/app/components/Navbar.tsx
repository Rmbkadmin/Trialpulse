"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        background: "black",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          TrialPulse
          
        </Link>
        <Link
  href="/saved"
  style={{
    color: "white",
    textDecoration: "none",
  }}
>
  Saved Sites
</Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        {!user && (
          <>
            <Link
              href="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              href="/register"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span>
              {user.firstName} ({user.role})
            </span>

            <button
              onClick={logout}
              style={{
                padding: "8px 14px",
                background: "white",
                color: "black",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}