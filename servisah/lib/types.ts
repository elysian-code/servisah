export type UserRole = "USER" | "PROVIDER" | "BUSINESS" | "ADMIN"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  verified: boolean
  createdAt: string
  phone?: string
  address?: Address
  bio?: string
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  lat?: number
  lng?: number
}

export interface Service {
  id: string
  title: string
  description: string
  price: number
  priceType: "HOURLY" | "FIXED"
  category: Category
  provider: User
  rating: number
  reviewCount: number
  images: string[]
  tags: string[]
  availability?: Availability[]
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description?: string
  parentId?: string
}

export interface Availability {
  id: string
  date: string
  slots: TimeSlot[]
}

export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isBooked: boolean
}

export interface Booking {
  id: string
  service: Service
  customer: User
  provider: User
  status: BookingStatus
  date: string
  startTime: string
  endTime: string
  location: Address
  price: number
  paymentStatus: PaymentStatus
  createdAt: string
  notes?: string
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"

export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED" | "FAILED"

export interface Transaction {
  id: string
  userId: string
  amount: number
  type: "DEPOSIT" | "WITHDRAWAL" | "PAYMENT" | "REFUND" | "PAYOUT"
  status: "PENDING" | "COMPLETED" | "FAILED"
  description: string
  createdAt: string
  bookingId?: string
}

export interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  transactions: Transaction[]
}

export interface Review {
  id: string
  bookingId: string
  serviceId: string
  customerId: string
  providerId: string
  rating: number
  comment: string
  createdAt: string
  reply?: {
    text: string
    createdAt: string
  }
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
  readAt?: string
  attachments?: Attachment[]
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage?: Message
  createdAt: string
  updatedAt: string
}

export interface Attachment {
  id: string
  url: string
  type: "IMAGE" | "DOCUMENT" | "OTHER"
  name: string
  size: number
}

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: string
  data?: Record<string, any>
}

export type NotificationType =
  | "BOOKING_REQUEST"
  | "BOOKING_CONFIRMED"
  | "BOOKING_CANCELLED"
  | "PAYMENT_RECEIVED"
  | "MESSAGE_RECEIVED"
  | "REVIEW_RECEIVED"
  | "SYSTEM"
