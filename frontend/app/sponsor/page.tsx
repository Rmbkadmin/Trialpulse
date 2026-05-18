"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SponsorPage() {
  const [sites, setSites] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/sites`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSites(data);
        }
      });
  }, []);

  const therapeuticCounts: Record<
    string,
    number
  > = {};

  sites.forEach((site) => {
    site.therapeuticAreas?.forEach(
      (area: string) => {
        therapeuticCounts[area] =
          (therapeuticCounts[area] || 0) + 1;
      }
    );
  });

  const chartData = Object.entries(
    therapeuticCounts
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#00c49f",
  ];

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
          Sponsor Dashboard
        </h1>

        <div
          style={{
            background: "white",
            padding: 24,
            borderRadius: 16,
          }}
        >
          <h2
            style={{
              fontSize: 28,
              marginBottom: 20,
            }}
          >
            Therapeutic Area Distribution
          </h2>

          <div
            style={{
              width: "100%",
              height: 400,
            }}
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={140}
                  label
                >
                  {chartData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: 20,
            marginTop: 40,
          }}
        >
          {sites.map((site) => {
            const avg =
              site.reviews.length > 0
                ? (
                    site.reviews.reduce(
                      (
                        sum: number,
                        r: any
                      ) =>
                        sum +
                        r.overallRating,
                      0
                    ) / site.reviews.length
                  ).toFixed(1)
                : "N/A";

            return (
              <div
                key={site.id}
                style={{
                  background: "white",
                  padding: 24,
                  borderRadius: 16,
                }}
              >
                <h2
                  style={{
                    fontSize: 24,
                  }}
                >
                  {site.name}
                </h2>

                <p>
                  {site.city},{" "}
                  {site.state}
                </p>

                <p>
                  Avg Rating: ⭐ {avg}
                </p>

                <p>
                  Reviews:{" "}
                  {site.reviews.length}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}