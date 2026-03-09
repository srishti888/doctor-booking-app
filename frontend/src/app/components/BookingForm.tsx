// "use client";

// import { useState } from "react";
// import SlotSelect from "./SelectSlot";

// type BookingFormProps = {
//   slots: string[];
//   slug: string;
// };

// export default function BookingForm({ slots, slug }: BookingFormProps) {
//   const [name, setName] = useState<string>("");
//   const [phone, setPhone] = useState<string>("");
//   const [slot, setSlot] = useState<string>("");
//   const [message, setMessage] = useState<string>("");

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
  
//     const res = await fetch(`http://localhost:8000/doctors/${slug}/book/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         patient_name: name,
//         patient_phone: phone,
//         scheduled_at: slot
//       })
//     });
  
//     const data = await res.json();
  
//     if (res.ok) {
//       setMessage("Booking confirmed!");
//     } else {
//       console.log(data);
//       setMessage("Booking failed.");
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <input
//         type="text"
//         placeholder="Patient Name"
//         className="w-full border p-2 rounded"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <input
//         type="tel"
//         placeholder="Phone Number"
//         className="w-full border p-2 rounded"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         required
//       />

//       <SlotSelect
//         slots={slots}
//         selected={slot}
//         setSelectedAction={setSlot}
//       />

//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white p-2 rounded"
//       >
//         Book Appointment
//       </button>

//       {message && (
//         <p className="text-center mt-2">{message}</p>
//       )}
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import SlotSelect from "./SelectSlot";

type BookingFormProps = {
  slots: string[];
  slug: string;
  doctorName?: string;
};

export default function BookingForm({ slots, slug, doctorName }: BookingFormProps) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`http://localhost:8000/doctors/${slug}/book/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: name,
          patient_phone: phone,
          scheduled_at: slot,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Booking confirmed! We'll see you soon.");
      } else {
        console.error(data);
        setStatus("error");
        setMessage(data?.detail || "Booking failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please check your connection.");
    }
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: "none",
    backgroundColor: "#DFDFDE",
    color: "#48352D",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
    transition: "box-shadow 0.2s",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        style={inputBase}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(117,193,167,0.5)")
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />

      {/* Phone */}
      <input
        type="tel"
        placeholder="Phone Number"
        style={inputBase}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(117,193,167,0.5)")
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />

      {/* Slot Picker Card */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: "20px 20px 16px",
          boxShadow: "0 2px 12px rgba(139,107,91,0.08)",
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#8B6B5B",
            marginBottom: 14,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Available Time Slots
        </p>
        <SlotSelect slots={slots} selected={slot} setSelectedAction={setSlot} />
      </div>

      {/* Status message */}
      {message && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            backgroundColor:
              status === "success"
                ? "rgba(117,193,167,0.15)"
                : "rgba(139,107,91,0.1)",
            color: status === "success" ? "#75C1A7" : "#8B6B5B",
            fontSize: 14,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      {/* Confirm button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
        <button
          type="submit"
          disabled={status === "loading" || !slot}
          style={{
            backgroundColor: status === "loading" || !slot ? "#C4BFBE" : "#75C1A7",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "14px 40px",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.04em",
            cursor: status === "loading" || !slot ? "not-allowed" : "pointer",
            transition: "background-color 0.2s, transform 0.1s",
            fontFamily: "inherit",
            boxShadow:
              status === "loading" || !slot
                ? "none"
                : "0 4px 16px rgba(117,193,167,0.35)",
          }}
          onMouseEnter={(e) => {
            if (status !== "loading" && slot)
              (e.currentTarget.style.backgroundColor = "#5aad93");
          }}
          onMouseLeave={(e) => {
            if (status !== "loading" && slot)
              (e.currentTarget.style.backgroundColor = "#75C1A7");
          }}
          onMouseDown={(e) => {
            if (status !== "loading" && slot)
              (e.currentTarget.style.transform = "scale(0.97)");
          }}
          onMouseUp={(e) => {
            (e.currentTarget.style.transform = "scale(1)");
          }}
        >
          {status === "loading" ? "Confirming…" : "Confirm"}
        </button>
      </div>
    </form>
  );
}