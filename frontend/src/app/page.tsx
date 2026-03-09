import Link from "next/link";
import { getAllDoctors, Doctor } from "@/app/lib/api";

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&backgroundColor=c0aafa`;
}

const SPEC_COLORS = [
  { bg: "rgba(117,193,167,0.12)", text: "#75C1A7", border: "rgba(117,193,167,0.35)" },
  { bg: "rgba(139,107,91,0.10)", text: "#8B6B5B", border: "rgba(139,107,91,0.3)" },
  { bg: "rgba(72,53,45,0.08)",   text: "#48352D", border: "rgba(72,53,45,0.2)" },
];

type ColorPair = { bg: string; text: string; border: string };

function specColor(index: number): ColorPair {
  return SPEC_COLORS[index % SPEC_COLORS.length];
}

export default async function Home() {
  let doctors: Doctor[] = [];
  let error = false;

  try {
    doctors = await getAllDoctors();
  } catch {
    error = true;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F0F0F0",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* ── Header ── */}
      <header
        style={{
          backgroundColor: "#F0F0F0",
          borderBottom: "1px solid #DFDFDE",
          padding: "0 48px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#75C1A7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#48352D", letterSpacing: "-0.02em" }}>
            MediBook
          </span>
        </div>
        <span style={{ fontSize: 13, color: "#8B6B5B" }}>Book with trust</span>
      </header>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 48px 40px" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#75C1A7",
            marginBottom: 16,
          }}
        >
          Trusted specialists
        </p>
        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 900,
            color: "#48352D",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 20,
            maxWidth: 600,
          }}
        >
          Find Your Doctor,
          <br />
          Book in Seconds.
        </h1>
        <p style={{ fontSize: 16, color: "#8B6B5B", maxWidth: 460, lineHeight: 1.7 }}>
          Browse verified specialists and secure your appointment with just a few clicks.
          No waiting rooms, no phone calls.
        </p>
      </section>

      {/* ── Divider ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ height: 1, backgroundColor: "#DFDFDE" }} />
      </div>

      {/* ── Doctor grid ── */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 48px 80px" }}>
        {error && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#8B6B5B", fontSize: 16 }}>
            Could not load doctors. Make sure the backend is running at{" "}
            <code style={{ color: "#48352D" }}>http://localhost:8000</code>.
          </div>
        )}

        {!error && doctors.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#8B6B5B", fontSize: 16 }}>
            No doctors available at the moment.
          </div>
        )}

        {!error && doctors.length > 0 && (
          <>
            <p style={{ fontSize: 13, color: "#C4BFBE", marginBottom: 28, fontWeight: 600 }}>
              {doctors.length} specialist{doctors.length !== 1 ? "s" : ""} available
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {doctors.map((doctor, i) => (
                <DoctorCard key={doctor.id} doctor={doctor} color={specColor(i)} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ── Doctor Card Component ────────────────────────────────────
function DoctorCard({ doctor, color }: { doctor: Doctor; color: ColorPair }) {
  return (
    <Link href={`/doctors/${doctor.slug}`} style={{ textDecoration: "none" }}>
      <div
        className="doctor-card"
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: "28px 24px 24px",
          border: "1.5px solid #DFDFDE",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Avatar + availability badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #DFDFDE",
              flexShrink: 0,
              backgroundColor: "#F0F0F0",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl(doctor.slug)}
              alt={doctor.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "rgba(117,193,167,0.12)",
              border: "1px solid rgba(117,193,167,0.3)",
              borderRadius: 20,
              padding: "4px 10px",
            }}
          >
            <div
              style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#75C1A7" }}
            />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#75C1A7", letterSpacing: "0.04em" }}>
              AVAILABLE
            </span>
          </div>
        </div>

        {/* Name & specialization */}
        <div>
          <h2
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "#48352D",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {doctor.name}
          </h2>
          <div style={{ marginTop: 10 }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: color.bg,
                color: color.text,
                border: `1px solid ${color.border}`,
                borderRadius: 20,
                padding: "3px 12px",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {doctor.specialization}
            </span>
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 16,
            borderTop: "1px solid #F0F0F0",
          }}
        >
          <span style={{ fontSize: 13, color: "#C4BFBE", fontWeight: 500 }}>
            Click to book
          </span>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#75C1A7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .doctor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(139,107,91,0.12);
          border-color: #C4BFBE !important;
        }
      `}</style>
    </Link>
  );
}