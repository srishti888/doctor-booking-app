import { getDoctorBooking } from "@/app/lib/api";
import BookingForm from "@/app/components/BookingForm";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DoctorBookingPage({ params }: PageProps) {
  const { slug } = await params;

  let data: any;

  try {
    data = await getDoctorBooking(slug);
  } catch (error) {
    return <div className="p-4">Error loading doctor data.</div>;
  }

  if (!data) {
    return <div className="p-4">No doctor found.</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p className="text-gray-600 mb-4">{data.specialization}</p>

      <BookingForm slots={data.available_slots} slug={slug} />
    </div>
  );
}