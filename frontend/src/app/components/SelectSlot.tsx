"use client";

type SelectSlotProps = {
  slots: string[];
  selected: string;
  setSelectedAction: (slot: string) => void;
};

export default function SelectSlot({ slots, selected, setSelectedAction }: SelectSlotProps) {
  if (!slots || slots.length === 0) return <p>No slots available</p>;

  return (
    <div className="mb-4 grid grid-cols-2 gap-2">
      {slots.map((slot) => (
        <button
          key={slot}
          type="button"
          onClick={() => setSelectedAction(slot)}
          className={`rounded border p-2 ${selected === slot ? "bg-blue-500 text-white" : ""}`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}

