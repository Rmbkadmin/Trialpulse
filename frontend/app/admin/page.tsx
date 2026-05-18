"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminPage() {
  const [sites, setSites] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.role === "ADMIN") {
        setAuthorized(true);
      }
    }

    fetch(`${API_URL}/sites`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSites(data);
        }
      });
  }, []);

  if (!authorized) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Access Denied</h1>
      </main>
    );
  }

  const totalReviews = sites.reduce(
    (sum, site) => sum + site.reviews.length,
    0
  );

  const chartData = sites.map((site) => ({
    name: site.name,
    reviews: site.reviews.length,
  }));

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
          Admin Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div style={{ background: "white", padding: 24, borderRadius: 16 }}>
            <h2>Total Sites</h2>
            <p style={{ fontSize: 36, fontWeight: "bold" }}>{sites.length}</p>
          </div>

          <div style={{ background: "white", padding: 24, borderRadius: 16 }}>
            <h2>Total Reviews</h2>
            <p style={{ fontSize: 36, fontWeight: "bold" }}>{totalReviews}</p>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: 24,
            borderRadius: 16,
            marginTop: 40,
          }}
        >
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>
            Reviews Per Site
          </h2>

          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </>
  );
}