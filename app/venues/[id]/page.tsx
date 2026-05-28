import { MOCK_VENUES, MOCK_COMPANIONS } from "@/lib/mock-data";
import VenueDetailClient from "./VenueDetailClient";

export async function generateStaticParams() {
  return MOCK_VENUES.map((v) => ({ id: v.id }));
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = MOCK_VENUES.find((v) => v.id === id) ?? MOCK_VENUES[0];
  const residents = MOCK_COMPANIONS.filter((c) =>
    venue.residents.includes(c.id)
  );

  return <VenueDetailClient venue={venue} residents={residents} />;
}
