import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import type { Venue } from "@/types";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link href={`/venues/${venue.id}`}>
      <div className="card overflow-hidden card-hover">
        {/* 封面图 */}
        <div className="relative h-36 w-full">
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 50%)" }} />
          <div className="absolute bottom-2 left-3 right-3">
            <p className="font-bold text-sm text-white truncate">{venue.name}</p>
          </div>
        </div>

        {/* 信息 */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[#888] text-xs">
              <MapPin size={11} />
              <span>{venue.distance}</span>
            </div>
            <StarRating rating={venue.rating} size={11} />
          </div>

          <div className="flex items-center gap-1.5 text-[#888] text-xs mb-2">
            <Clock size={11} />
            <span>{venue.openHours}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1 flex-wrap">
              {venue.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="gray">{tag}</Badge>
              ))}
            </div>
            <span className="text-xs">
              <span className="text-[#c9a84c] font-black">¥{venue.pricePerHour}</span>
              <span className="text-[#555]">/小时</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
