const blobs = [
  {
    size: 620,
    top: "-10%",
    left: "-8%",
    color: "rgba(6, 182, 212, 0.22)",
  },
  {
    size: 540,
    top: "20%",
    left: "60%",
    color: "rgba(168, 85, 247, 0.20)",
  },
  {
    size: 480,
    top: "65%",
    left: "5%",
    color: "rgba(236, 72, 153, 0.16)",
  },
  {
    size: 440,
    top: "75%",
    left: "65%",
    color: "rgba(16, 185, 129, 0.13)",
  },
];

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-30 overflow-hidden"
    >
      {/* static gradient blobs — no filters or blend modes, so scrolling never repaints them */}
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
          }}
        />
      ))}

      {/* faint grid overlay */}
      <div
        className="absolute inset-0 grid-pattern opacity-[0.18]"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(7, 7, 11, 0.55) 100%)",
        }}
      />
    </div>
  );
}
