"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [sites, setSites] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("highestRated");
  const [therapeuticFilter, setTherapeuticFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [minimumRating, setMinimumRating] = useState(0);
  const [savedSites, setSavedSites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedSites");
    if (saved) setSavedSites(JSON.parse(saved));

    fetch(`${API_URL}/sites`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSites(data);
      })
      .catch(console.error);
  }, []);

  function toggleSaved(siteId: string) {
    const updated = savedSites.includes(siteId)
      ? savedSites.filter((id) => id !== siteId)
      : [...savedSites, siteId];

    setSavedSites(updated);
    localStorage.setItem("savedSites", JSON.stringify(updated));
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: 40,
          fontFamily: "Arial",
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ fontSize: 42, fontWeight: "bold", marginBottom: 10 }}>
          TrialPulse
        </h1>

        <p style={{ color: "#666", marginBottom: 30 }}>
          Clinical Research Site Ratings Platform
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 30,
          }}
        >
          <input
            placeholder="Search research sites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: 14,
              width: "100%",
              maxWidth: 500,
              borderRadius: 10,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: 14, borderRadius: 10, border: "1px solid #ccc" }}
          >
            <option value="highestRated">Highest Rated</option>
            <option value="mostReviewed">Most Reviewed</option>
          </select>

          <select
            value={therapeuticFilter}
            onChange={(e) => setTherapeuticFilter(e.target.value)}
            style={{ padding: 14, borderRadius: 10, border: "1px solid #ccc" }}
          >
            <option value="">All Therapeutic Areas</option>
            <option value="Oncology">Oncology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Rare Disease">Rare Disease</option>
            <option value="Endocrinology">Endocrinology</option>
          </select>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            style={{ padding: 14, borderRadius: 10, border: "1px solid #ccc" }}
          >
            <option value="">All States</option>
            <option value="MA">Massachusetts</option>
            <option value="GA">Georgia</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>

          <select
            value={minimumRating}
            onChange={(e) => setMinimumRating(Number(e.target.value))}
            style={{ padding: 14, borderRadius: 10, border: "1px solid #ccc" }}
          >
            <option value={0}>Any Rating</option>
            <option value={3}>3+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={4.5}>4.5+ Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {sites
            .filter((site) =>
              site.name.toLowerCase().includes(search.toLowerCase())
            )
            .filter(
              (site) =>
                !therapeuticFilter ||
                site.therapeuticAreas?.includes(therapeuticFilter)
            )
            .filter((site) => !stateFilter || site.state === stateFilter)
            .filter((site) => {
              if (!minimumRating) return true;

              const avg = site.reviews.length
                ? site.reviews.reduce(
                    (sum: number, r: any) => sum + r.overallRating,
                    0
                  ) / site.reviews.length
                : 0;

              return avg >= minimumRating;
            })
            .sort((a, b) => {
              if (sortBy === "mostReviewed") {
                return b.reviews.length - a.reviews.length;
              }

              const aAvg = a.reviews.length
                ? a.reviews.reduce(
                    (sum: number, r: any) => sum + r.overallRating,
                    0
                  ) / a.reviews.length
                : 0;

              const bAvg = b.reviews.length
                ? b.reviews.reduce(
                    (sum: number, r: any) => sum + r.overallRating,
                    0
                  ) / b.reviews.length
                : 0;

              return bAvg - aAvg;
            })
            .map((site) => {
              const avg = site.reviews.length
                ? (
                    site.reviews.reduce(
                      (sum: number, r: any) => sum + r.overallRating,
                      0
                    ) / site.reviews.length
                  ).toFixed(1)
                : "No ratings";

              return (
                <Link
                  key={site.id}
                  href={`/sites/${site.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      background: "white",
                      width: "100%",
                      boxSizing: "border-box",
                      borderRadius: 16,
                      padding: 24,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      cursor: "pointer",
                    }}
                  >
                    <h2 style={{ fontSize: 26, marginBottom: 8 }}>
                      {site.name}
                    </h2>

                    <p>
                      {site.city}, {site.state}
                    </p>

                    <p>{site.specialty}</p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginTop: 10,
                      }}
                    >
                      {site.therapeuticAreas?.map((area: string) => (
                        <span
                          key={area}
                          style={{
                            background: "#e8eefc",
                            padding: "6px 12px",
                            borderRadius: 999,
                            fontSize: 14,
                          }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: 12,
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      ⭐ {avg}
                    </div>

                    <p>{site.reviews.length} review(s)</p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSaved(site.id);
                      }}
                      style={{
                        marginTop: 12,
                        padding: "10px 16px",
                        border: "none",
                        borderRadius: 8,
                        cursor: "pointer",
                        background: savedSites.includes(site.id)
                          ? "#ffd54f"
                          : "#ddd",
                      }}
                    >
                      {savedSites.includes(site.id) ? "★ Saved" : "☆ Save Site"}
                    </button>
                  </div>
                </Link>
              );
            })}
        </div>
      </main>
    </>
  );
}