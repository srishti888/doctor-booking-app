"use client";

import { useState } from "react";
import SlotSelect from "./SelectSlot";

type BookingFormProps = {
  slots: string[];
  slug: string;
};

export default function BookingForm({ slots, slug }: BookingFormProps) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    const res = await fetch(`http://localhost:8000/doctors/${slug}/book/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient_name: name,
        patient_phone: phone,
        scheduled_at: slot
      })
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setMessage("Booking confirmed!");
    } else {
      console.log(data);
      setMessage("Booking failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Patient Name"
        className="w-full border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full border p-2 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <SlotSelect
        slots={slots}
        selected={slot}
        setSelectedAction={setSlot}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Book Appointment
      </button>

      {message && (
        <p className="text-center mt-2">{message}</p>
      )}
    </form>
  );
}