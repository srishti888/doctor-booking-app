export async function getDoctorBooking(slug: string): Promise<any> {
    const res = await fetch(`http://localhost:8000/doctors/${slug}/slots/`, {
      cache: "no-store"
    });
  
    if (!res.ok) {
      console.log(res)
      throw new Error("Failed to fetch doctor data");
    }
  
    return res.json();
  }