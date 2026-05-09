"use client";

import { useState } from "react";

const C = {
  bg: "#06060a",
  card: "#111118",
  cardBorder: "#1a1a2e",
  surface: "#16161f",
  accent: "#8b5cf6",
  green: "#10b981",
  yellow: "#f59e0b",
  blue: "#3b82f6",
  pink: "#ec4899",
  cyan: "#06b6d4",
  text: "#e2e8f0",
  textMid: "#94a3b8",
  textDim: "#64748b",
};

const GRADIENT_PAIRS = [
  ["#8b5cf6", "#ec4899"],
  ["#3b82f6", "#06b6d4"],
  ["#10b981", "#3b82f6"],
  ["#f59e0b", "#ef4444"],
  ["#ec4899", "#8b5cf6"],
  ["#06b6d4", "#10b981"],
  ["#ef4444", "#f59e0b"],
  ["#3b82f6", "#8b5cf6"],
];

interface Review {
  name: string;
  review: string;
  rating: number; // 1-5
  highlight?: boolean;
}

const REVIEWS: Review[] = [
  {
    name: "Darsh Bahel",
    review: "It helps a lot, I suggest everyone to use it. It's extremely cheap and has a lot of benefits.",
    rating: 5,
  },
  {
    name: "Disha Gupta",
    review: "Saviours AI tool is the bestest tool I have ever used than others... it really helped me a lot while practicing sample papers with focus mode.",
    rating: 5,
    highlight: true,
  },
  {
    name: "Ayush Sharma",
    review: "It really helped in covering topics with one or two questions.",
    rating: 4,
  },
  {
    name: "Paras",
    review: "It was very helpful but Pranay bhaiya op 🔥",
    rating: 5,
  },
  {
    name: "Manntrra Pawar",
    review: "Honestly, it gave me twisted questions which helped to do the same topics in a difficult manner.",
    rating: 5,
  },
  {
    name: "Bhawandeep Singh Bhullar",
    review: "It helped me score 85 above in every subject!",
    rating: 5,
    highlight: true,
  },
  {
    name: "Aarav",
    review: "Best! 🏆",
    rating: 5,
  },
  {
    name: "Ishika Sagar",
    review: "It helped me really well with my boards, and my boards went really well.",
    rating: 5,
  },
  {
    name: "Rihaan Chawla",
    review: "The only reason to score good in exams!",
    rating: 5,
    highlight: true,
  },
  {
    name: "Aryan",
    review: "Absolutely amazing experience! 💯",
    rating: 5,
  },
  {
    name: "Abhyang Salve",
    review: "What they didn't help with — ask that! They helped me in each and every way and also cleared all doubts.",
    rating: 5,
  },
  {
    name: "Shriya Hari",
    review: "Not only Saviours AI but Pranay bhaiya specially helped me so much these few days. Without him and this AI, I could not have studied so much in such a limited time span.",
    rating: 5,
    highlight: true,
  },
  {
    name: "Aachal Dhakde",
    review: "Saviours are really OP! It helped me sort a lot of things in my work and also helps me with my revision work. Love the flash cards soooo much!",
    rating: 5,
  },
  {
    name: "Biswanath Das",
    review: "Saviours AI helped a lot in my studies.",
    rating: 4,
  },
  {
    name: "Murtaza Vakharia",
    review: "It was the best! ⭐",
    rating: 5,
  },
  {
    name: "Sparsh",
    review: "I was unable to plan my days and boards were coming near. I was not well prepared but due to this AI I became very productive and didn't waste any time. Got my task and focused to complete it — honestly it really helped me.",
    rating: 5,
    highlight: true,
  },
  {
    name: "Samartha",
    review: "Very useful especially during exams.",
    rating: 4,
  },
  {
    name: "Priyansh",
    review: "It helps me a lot by clearing my doubts.",
    rating: 4,
  },
  {
    name: "Mantasha Tabrej",
    review: "It helped me a lot specifically in subjects like History, Geography, and Maths. Great efforts by the team — the only teaching community who really helped the students by thinking about our needs. Thank you Pranay Bhaiya and Team!",
    rating: 5,
    highlight: true,
  },
  {
    name: "Sarthak Mehta",
    review: "It actually helped me a lot during my tests. Without Pranay bhaiya and Saviours AI, I don't think I would have gotten good grades. The one shot lectures and short lectures are the best — I would definitely recommend everyone!",
    rating: 5,
    highlight: true,
  },
  {
    name: "Syeda Hania",
    review: "Helped me ace all my competency-based questions and MCQs!",
    rating: 5,
  },
  {
    name: "Ashutosh Jaiswal",
    review: "The best thing is that it is at a very affordable price with so many features. We want to show our love and support to Pranay bhaiya — Saviours OP!",
    rating: 5,
  },
  {
    name: "Devam Singh",
    review: "The best! 🙌",
    rating: 5,
  },
  {
    name: "Amanullah Ansari",
    review: "Really helpful throughout the entire exam preparation journey. Would recommend to every ICSE student!",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            fontSize: 12,
            color: i <= count ? C.yellow : "rgba(255,255,255,0.1)",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const gradientPair = GRADIENT_PAIRS[index % GRADIENT_PAIRS.length];
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      style={{
        background: review.highlight
          ? `linear-gradient(135deg, ${C.card}, ${C.surface})`
          : C.card,
        border: `1px solid ${review.highlight ? `${C.accent}30` : C.cardBorder}`,
        borderRadius: 16,
        padding: "22px 20px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${gradientPair[0]}50`;
        e.currentTarget.style.boxShadow = `0 8px 32px ${gradientPair[0]}10`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = review.highlight ? `${C.accent}30` : C.cardBorder;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Accent glow for highlighted */}
      {review.highlight && (
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${gradientPair[0]}10, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Quote icon */}
      <div
        style={{
          fontSize: 28,
          lineHeight: 1,
          color: `${gradientPair[0]}30`,
          fontFamily: "Georgia, serif",
          userSelect: "none",
        }}
      >
        "
      </div>

      {/* Review text */}
      <p
        style={{
          fontSize: 13.5,
          lineHeight: 1.65,
          color: C.text,
          margin: 0,
          fontWeight: 400,
          flex: 1,
        }}
      >
        {review.review}
      </p>

      {/* Student info */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto" }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${gradientPair[0]}, ${gradientPair[1]})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 800,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: C.text,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {review.name}
          </div>
          <StarRating count={review.rating} />
        </div>
      </div>
    </div>
  );
}

export function ReviewsPage() {
  const totalReviews = REVIEWS.length;
  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1);
  const fiveStarCount = REVIEWS.filter((r) => r.rating === 5).length;
  const highlightCount = REVIEWS.filter((r) => r.highlight).length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1
          className="admin-page-title"
          style={{
            fontSize: 26,
            fontWeight: 800,
            background: `linear-gradient(135deg, #fff 30%, ${C.yellow})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            letterSpacing: -0.5,
          }}
        >
          ⭐ Student Reviews
        </h1>
        <p style={{ color: C.textDim, margin: "4px 0 0", fontSize: 13 }}>
          Real feedback from real students
        </p>
      </div>

      {/* Stats Bar */}
      <div className="admin-kpi-grid-4" style={{ marginBottom: 28 }}>
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.yellow}15, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>
            Total Reviews
          </div>
          <div className="admin-stat-value" style={{ fontSize: 30, fontWeight: 800, color: C.yellow, letterSpacing: -1, lineHeight: 1 }}>
            {totalReviews}
          </div>
          <div style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>From verified students</div>
        </div>

        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.green}15, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>
            Avg Rating
          </div>
          <div className="admin-stat-value" style={{ fontSize: 30, fontWeight: 800, color: C.green, letterSpacing: -1, lineHeight: 1 }}>
            {avgRating} <span style={{ fontSize: 16 }}>★</span>
          </div>
          <div style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>Out of 5.0</div>
        </div>

        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.accent}15, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>
            5-Star Reviews
          </div>
          <div className="admin-stat-value" style={{ fontSize: 30, fontWeight: 800, color: C.accent, letterSpacing: -1, lineHeight: 1 }}>
            {fiveStarCount}
          </div>
          <div style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>{Math.round((fiveStarCount / totalReviews) * 100)}% of total</div>
        </div>

        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.pink}15, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>
            Highlights
          </div>
          <div className="admin-stat-value" style={{ fontSize: 30, fontWeight: 800, color: C.pink, letterSpacing: -1, lineHeight: 1 }}>
            {highlightCount}
          </div>
          <div style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>Featured testimonials</div>
        </div>
      </div>

      {/* Masonry-ish Review Grid */}
      <div
        style={{
          columnCount: 3,
          columnGap: 16,
        }}
        className="admin-reviews-grid"
      >
        {REVIEWS.map((review, i) => (
          <div key={i} style={{ breakInside: "avoid", marginBottom: 16 }}>
            <ReviewCard review={review} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
