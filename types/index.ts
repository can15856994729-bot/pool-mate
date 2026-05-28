// ─── 陪玩师 ─────────────────────────────────────────────────
export interface Companion {
  id: string;
  name: string;
  avatar: string;
  level: "新手" | "初级" | "中级" | "高级" | "大师";
  distance: string; // e.g. "1.2km"
  rating: number; // 0-5
  reviewCount: number;
  pricePerHour: number; // 元/小时
  tags: string[]; // e.g. ["中式八球", "斯诺克", "教学"]
  services: ServiceType[];
  bio: string;
  verified: boolean; // 实名认证
  online: boolean; // 是否在线可约
  ordersCompleted: number;
  favoriteVenues: string[]; // venue ids
  availableTime: string; // e.g. "每天 18:00-23:00"
  gallery: string[]; // 照片/视频封面
  reviews: Review[];
  specialties: string[]; // 擅长项目
}

export type ServiceType = "陪打" | "陪练" | "教学" | "组局";

// ─── 评价 ────────────────────────────────────────────────────
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ─── 球局 ────────────────────────────────────────────────────
export interface Game {
  id: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  hostRating: number;
  venueId: string;
  venueName: string;
  venueAddress: string;
  gameTime: string; // ISO string
  totalSlots: number;
  filledSlots: number;
  gameType: GameType;
  levelRequired: string;
  feeType: "AA" | "发起人请客" | "面议";
  feeNote: string;
  note?: string;
  status: "recruiting" | "full" | "completed";
}

export type GameType = "中式八球" | "斯诺克" | "美式九球" | "不限";

// ─── 球房 ────────────────────────────────────────────────────
export interface Venue {
  id: string;
  name: string;
  address: string;
  distance: string;
  openHours: string;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  images: string[];
  tables: Table[];
  residents: string[]; // companion ids
  phone: string;
  tags: string[];
}

export interface Table {
  id: string;
  number: string;
  type: string;
  available: boolean;
  pricePerHour: number;
}

// ─── 预约 / 订单 ──────────────────────────────────────────────
export interface Booking {
  id: string;
  companionId: string;
  companionName: string;
  companionAvatar: string;
  service: ServiceType;
  duration: number; // 小时
  venueId: string;
  venueName: string;
  bookingTime: string; // ISO string
  note?: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export type BookingStatus =
  | "待确认"
  | "已确认"
  | "进行中"
  | "已完成"
  | "已取消";

// ─── 用户 ────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  isCompanion: boolean;
}
