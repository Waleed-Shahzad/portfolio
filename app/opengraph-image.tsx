import { ImageResponse } from "next/og";

import { profile, stats } from "@/data/stats";

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const highlights = stats
  .slice(0, 3)
  .map((s) => [`${s.value}${s.suffix}`, s.label] as const);

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#07070b",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(168,85,247,0.35), transparent 45%), radial-gradient(circle at 85% 85%, rgba(6,182,212,0.30), transparent 45%)",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "linear-gradient(120deg, #06b6d4, #a855f7)",
                color: "#07070b",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              W
            </div>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#94a3b8",
              }}
            >
              waleed-shahzad.vercel.app
            </div>
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#06b6d4",
              border: "1px solid rgba(6,182,212,0.45)",
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            Open to work
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div style={{ marginTop: 18, fontSize: 33, color: "#a5b4fc" }}>
            Full Stack Developer &amp; Team Lead · MERN · React Native · AWS
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {highlights.map(([value, label]) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "22px 28px",
                borderRadius: 24,
                backgroundColor: "rgba(23,30,46,0.9)",
                border: "1px solid rgba(148,163,184,0.2)",
                minWidth: 250,
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 700 }}>{value}</div>
              <div
                style={{
                  fontSize: 19,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  marginTop: 6,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
