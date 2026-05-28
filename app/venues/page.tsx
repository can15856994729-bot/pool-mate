import PageHeader from "@/components/layout/PageHeader";
import VenueCard from "@/components/venue/VenueCard";
import { MOCK_VENUES } from "@/lib/mock-data";

export default function VenuesPage() {
  return (
    <div>
      <PageHeader title="附近球房" showBack={false} />

      {/* 简单分类栏 */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {["全部", "24小时", "斯诺克专区", "价格最低", "评分最高"].map((tab, i) => (
          <span
            key={tab}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{
              background: i === 0 ? "#1a6b3c" : "#1c1c1c",
              color: i === 0 ? "#f0f0f0" : "#666",
              border: `1px solid ${i === 0 ? "#1a6b3c" : "#2a2a2a"}`,
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="px-4 space-y-3 pb-4">
        {MOCK_VENUES.map((venue) => (
          <div key={venue.id}>
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>

      <div className="h-4" />
    </div>
  );
}
