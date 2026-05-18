"use client";

import { use, useEffect, useState } from "react";
import StarRating from "../../components/StarRating";
import Navbar from "../../components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SiteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [site, setSite] = useState<any>(null);
  const [form, setForm] = useState({
    overallRating: 5,
    communicationScore: 5,
    professionalismScore: 5,
    experienceScore: 5,
    reviewText: "",
  });
  const [message, setMessage] = useState("");

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

const userId = user.id;

    await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, siteId: id, ...form }),
    });

    setMessage("Review submitted");
  }

  if (!site) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <>
  <Navbar />
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 40 }}>{site.name}</h1>
      <p>{site.city}, {site.state}</p>
      <p>{site.specialty}</p>
<div
  style={{
    marginTop: 20,
    padding: 20,
    background: "#f5f5f5",
    borderRadius: 12,
    display: "grid",
    gap: 10,
    maxWidth: 400,
  }}
>
  <h3 style={{ fontSize: 24 }}>
    Rating Summary
  </h3>

  <p>
    Overall: ⭐{" "}
    {site.reviews.length
      ? (
          site.reviews.reduce(
            (sum: number, r: any) =>
              sum + r.overallRating,
            0
          ) / site.reviews.length
        ).toFixed(1)
      : "N/A"}
  </p>

  <p>
    Communication: ⭐{" "}
    {site.reviews.length
      ? (
          site.reviews.reduce(
            (sum: number, r: any) =>
              sum + r.communicationScore,
            0
          ) / site.reviews.length
        ).toFixed(1)
      : "N/A"}
  </p>

  <p>
    Professionalism: ⭐{" "}
    {site.reviews.length
      ? (
          site.reviews.reduce(
            (sum: number, r: any) =>
              sum + r.professionalismScore,
            0
          ) / site.reviews.length
        ).toFixed(1)
      : "N/A"}
  </p>

  <p>
    Experience: ⭐{" "}
    {site.reviews.length
      ? (
          site.reviews.reduce(
            (sum: number, r: any) =>
              sum + r.experienceScore,
            0
          ) / site.reviews.length
        ).toFixed(1)
      : "N/A"}
  </p>
</div>
      <h2 style={{ marginTop: 40, fontSize: 28 }}>Reviews</h2>

      {site.reviews.map((review: any) => (
        <div key={review.id} style={{ border: "1px solid #ccc", padding: 20, marginTop: 20 }}>
          <p>⭐ {review.overallRating}</p>
          <p>{review.reviewText}</p>
        </div>
      ))}

      <h2 style={{ marginTop: 50, fontSize: 28 }}>Submit Review</h2>

      <form onSubmit={submitReview} style={{ display: "grid", gap: 20, maxWidth: 500, marginTop: 20 }}>
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
      setForm({
        ...form,
        professionalismScore: value,
      })
    }
  />
</div>

<div>
  <p>Experience</p>

  <StarRating
    value={form.experienceScore}
    onChange={(value) =>
      setForm({
        ...form,
        experienceScore: value,
      })
    }
  />
</div>

        <textarea
          placeholder="Review"
          value={form.reviewText}
          onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
          rows={5}
        />

        <button type="submit" style={{ padding: 14, background: "black", color: "white" }}>
          Submit Review
        </button>

        <p>{message}</p>
      </form>
    </main>
    </>
  );
}