"use client";

import { use, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StarRating from "../../components/StarRating";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SiteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [site, setSite] = useState<any>(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    overallRating: 5,
    communicationScore: 5,
    professionalismScore: 5,
    experienceScore: 5,
    reviewText: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/sites/${id}`)
      .then((res) => res.json())
      .then(setSite)
      .catch(() => setMessage("Could not load site"));
  }, [id]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setMessage("Please login first");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user.verified) {
      setMessage("Please verify your email before posting reviews");
      return;
    }

    await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId: user.id,
        siteId: id,
        ...form,
      }),
    });

    setMessage("Review submitted");
  }

  if (!site) {
    return <p style={{ padding: 40 }}>Loading...</p>;
  }

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  return (
    <>
      <Navbar />

      <main style={{ padding: 40 }}>
        <h1 style={{ fontSize: 40 }}>{site.name}</h1>

        <p>
          {site.city}, {site.state}
        </p>

        <p>{site.specialty}</p>

        <h2 style={{ marginTop: 40, fontSize: 28 }}>Reviews</h2>

        {site.reviews.map((review: any) => (
          <div
            key={review.id}
            style={{
              border: "1px solid #ccc",
              padding: 20,
              marginTop: 20,
              borderRadius: 12,
            }}
          >
            <p>⭐ {review.overallRating}</p>
            <p>{review.reviewText}</p>
          </div>
        ))}

        <h2 style={{ marginTop: 50, fontSize: 28 }}>Submit Review</h2>

        {!user.verified && (
          <div
            style={{
              background: "#fff3cd",
              padding: 16,
              borderRadius: 10,
              marginBottom: 20,
              maxWidth: 500,
            }}
          >
            Verify your email before posting reviews.
          </div>
        )}

        <form
          onSubmit={submitReview}
          style={{
            display: "grid",
            gap: 20,
            maxWidth: 500,
            marginTop: 20,
          }}
        >
          <div>
            <p>Overall Rating</p>
            <StarRating
              value={form.overallRating}
              onChange={(value) =>
                setForm({ ...form, overallRating: value })
              }
            />
          </div>

          <div>
            <p>Communication</p>
            <StarRating
              value={form.communicationScore}
              onChange={(value) =>
                setForm({ ...form, communicationScore: value })
              }
            />
          </div>

          <div>
            <p>Professionalism</p>
            <StarRating
              value={form.professionalismScore}
              onChange={(value) =>
                setForm({ ...form, professionalismScore: value })
              }
            />
          </div>

          <div>
            <p>Experience</p>
            <StarRating
              value={form.experienceScore}
              onChange={(value) =>
                setForm({ ...form, experienceScore: value })
              }
            />
          </div>

          <textarea
            placeholder="Review"
            value={form.reviewText}
            onChange={(e) =>
              setForm({
                ...form,
                reviewText: e.target.value,
              })
            }
            rows={5}
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
            Submit Review
          </button>

          <p>{message}</p>
        </form>
      </main>
    </>
  );
}