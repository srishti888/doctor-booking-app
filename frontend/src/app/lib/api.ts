// export async function getDoctorBooking(slug: string): Promise<any> {
//     const res = await fetch(`http://localhost:8000/doctors/${slug}/slots/`, {
//       cache: "no-store"
//     });
  
//     if (!res.ok) {
//       console.log(res)
//       throw new Error("Failed to fetch doctor data");
//     }
  
//     return res.json();
//   }

const BASE_URL = "http://localhost:8000";

export type Doctor = {
  id: number;
  name: string;
  specialization: string;
  slug: string;
  is_active: boolean;
};

export type DoctorBooking = {
  doctor: Doctor;
  available_slots: string[];
};

// Fetch all active doctors for the listing page
export async function getAllDoctors(): Promise<Doctor[]> {
  const res = await fetch(`${BASE_URL}/doctors/`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
}

// Fetch a single doctor + their available slots
export async function getDoctorBooking(slug: string): Promise<DoctorBooking> {
  const res = await fetch(`${BASE_URL}/doctors/${slug}/slots/`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch doctor booking data");
  return res.json();
}