"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SavedSitesPage() {
  const [sites, setSites] = useState<any[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("savedSites") || "[]"
    );

    setSavedIds(stored);

    fetch(`${API_URL}/sites`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSites(data);
        }
      });
  }, []);

  const savedSites = sites.filter((site) =>
    savedIds.includes(site.id)
  );

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: 40,
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          Saved Sites
        </h1>

        <div
          style={{
            display: "grid",
            gap: 20,
          }}
        >
          {savedSites.map((site) => (
            <Link
              key={site.id}
              href={`/sites/${site.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: 24,
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    fontSize: 26,
                    marginBottom: 8,
                  }}
                >
                  {site.name}
                </h2>

                <p>
                  {site.city}, {site.state}
                </p>

                <p>{site.specialty}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}