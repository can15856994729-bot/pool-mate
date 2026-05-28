import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
}

export default function StarRating({ rating, size = 12, showNumber = true }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <Star size={size} fill="#c9a84c" color="#c9a84c" />
      {showNumber && (
        <span className="text-[#c9a84c] font-bold" style={{ fontSize: size + 1 }}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
