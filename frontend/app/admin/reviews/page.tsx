"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminReviewsPage() {
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

  async function deleteReview(id: string) {
    await fetch(`${API_URL}/reviews/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    });

    window.location.reload();
  }

  const reviews = sites.flatMap((site) =>
    site.reviews.map((review: any) => ({
      ...review,
      siteName: site.name,
    }))
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
          Review Moderation
        </h1>

        <div
          style={{
            display: "grid",
            gap: 20,
          }}
        >
          {reviews.map((review: any) => (
            <div
              key={review.id}
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
                  fontSize: 22,
                  marginBottom: 10,
                }}
              >
                {review.siteName}
              </h2>

              <p>
                ⭐ {review.overallRating}
              </p>

              <p
                style={{
                  marginTop: 10,
                }}
              >
                {review.reviewText}
              </p>

              <button
                onClick={() =>
                  deleteReview(review.id)
                }
                style={{
                  marginTop: 20,
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: 8,
                  background: "#ff5252",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Remove Review
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}