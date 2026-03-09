import { getDoctorBooking } from "@/app/lib/api";
import BookingForm from "@/app/components/BookingForm";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DoctorBookingPage({ params }: PageProps) {
  const { slug } = await params;

  let data: any;

  try {
    data = await getDoctorBooking(slug);
  } catch (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F0F0F0" }}
      >
        <p style={{ color: "#8B6B5B" }} className="text-lg font-medium">
          Error loading doctor data.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F0F0F0" }}
      >
        <p style={{ color: "#8B6B5B" }} className="text-lg font-medium">
          No doctor found.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "#F0F0F0",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* ── Back link ── */}
      <div style={{ padding: "20px 48px 0" }}>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "#8B6B5B",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="#8B6B5B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All Doctors
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT PANEL ── */}
          <div className="flex flex-col gap-10">
            {/* Doctor info card */}
            <div className="flex items-center gap-4">
              <div
                className="relative flex-shrink-0 rounded-full overflow-hidden"
                style={{
                  width: 72,
                  height: 72,
                  border: "3px solid #DFDFDE",
                  boxShadow: "0 4px 16px rgba(139,107,91,0.15)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.dicebear.com/7.x/personas/svg?seed=${slug}&backgroundColor=c0aafa`}
                  alt={data.doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2
                  className="text-xl font-bold tracking-tight"
                  style={{ color: "#48352D" }}
                >
                  {data.doctor.name}
                </h2>
                <p className="text-sm mt-0.5" style={{ color: "#8B6B5B" }}>
                  specialist | 12 years experience
                </p>
                <span
                  className="inline-block mt-1.5 px-3 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(117,193,167,0.18)",
                    color: "#75C1A7",
                    border: "1px solid rgba(117,193,167,0.35)",
                  }}
                >
                  {data.doctor.specialization}
                </span>
              </div>
            </div>

            {/* Hero heading */}
            <div>
              <h1
                className="text-5xl font-black leading-tight tracking-tight"
                style={{ color: "#48352D" }}
              >
                Book Your
                <br />
                Appointment
                <br />
                with TRUST
              </h1>
            </div>

            <p
              className="text-base leading-relaxed max-w-sm"
              style={{ color: "#8B6B5B" }}
            >
              Quick, easy, and secure booking. Your appointment is just a few
              clicks away.
            </p>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="flex flex-col gap-3">
            <BookingForm
              slots={data.available_slots}
              slug={slug}
              doctorName={data.doctor.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}