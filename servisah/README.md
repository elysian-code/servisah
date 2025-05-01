This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 🌐 servisah – Multi-Role Service Marketplace Platform (Frontend)

Welcome to the official frontend for **servisah**, a robust, scalable, and secure marketplace platform designed to connect **consumers**, **freelancers**, **small businesses**, and **staff** across various service industries like ride-hailing, repairs, deliveries, laundry, tailoring, engineering, etc.

This is a **Next.js 15 frontend** built for modern scalability, performance, and a delightful user experience.

---

## 🎯 Project Objective

Build a professional, production-ready platform that enables:
- **Freelancers** and **service providers** (e.g., Uber drivers, bike riders, mechanics, tailors) to **register, get verified, and offer customizable services**.
- **Consumers** and **small businesses** to **search, book, and pay for nearby available services**.
- **Staff** to assist businesses in managing services or operations.
- All users to interact through **realtime messaging, secure payments, and dispute resolution**.

---

## 👥 Supported Roles

| Role           | Capabilities |
|----------------|--------------|
| 🧑‍💼 Consumers     | Search, book services, rate, pay, track bookings |
| 🧰 Freelancers    | Register, customize services, accept orders, withdraw |
| 🏢 Small Businesses | Offer services AND book other services, manage staff |
| 👩‍💻 Staff          | Assist in business tasks like booking and support |
| 🛡️ Admin          | Platform moderation, KYC reviews, user control |

---

## ⚙️ Tech Stack

- **Frontend**: Next.js 15 (App Router, Server Actions, Server Components)
- **Styling**: TailwindCSS + ShadCN UI
- **State Management**: Zustand or TanStack Query
- **Forms & Validation**: React Hook Form + Zod
- **Auth**: Supabase Auth or Clerk (MFA support)
- **Geo Mapping**: Mapbox or Google Maps
- **Notifications**: OneSignal or Firebase
- **Payments**: Stripe, Paystack, or Flutterwave
- **Realtime Messaging**: Socket.io or Stream Chat
- **Language & Currency**: next-intl, multi-currency readiness

---

## 🧩 Core Features to Implement (ALL Required)

### 🔐 Authentication
- Email/password, phone OTP, Google/Apple login
- Role-aware registration flow
- MFA and session handling

### 🛂 KYC & Onboarding
- Step-by-step onboarding
- Upload ID, selfie, business documents
- Choose service categories, pricing, availability

### 🧭 Service Discovery
- Search/filter services by type, distance, rating
- View on map and list
- Provider detail pages

### 📦 Booking System
- Book now / schedule later
- Booking summary + confirmation
- Cancel, reschedule, mark complete

### 💬 Chat System
- Inbox with unread counts
- Realtime threads with consumers and providers
- Chat per booking

### 💳 Wallet & Payments
- Fund wallet (Stripe/Paystack)
- Hold funds in escrow
- Request payout
- View transaction history

### 🏆 Ratings & Reviews
- Rate providers after service
- Show average ratings, feedback

### 📊 Dashboards
- Custom dashboard for each role
- KPIs: earnings, bookings, response time

### 🧾 Admin Panel (optional frontend module)
- Approve/deny KYC
- Ban users, handle disputes
- Global service and payment settings

---

## 📱 UI & UX Expectations

- Fully responsive (mobile-first)
- PWA-ready (offline fallback optional)
- Modern UI using ShadCN components
- Accessible and performant
- SEO-optimized for landing pages

---

## 🗃️ Suggested Folder Structure

