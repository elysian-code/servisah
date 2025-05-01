import { create } from 'zustand'

interface BookingLocation {
  lat: number
  lng: number
  address: string
}

interface BookingDetails {
  serviceId: string
  providerId: string
  date: Date
  time: string
  location: BookingLocation
  price: number
  notes?: string
}

interface BookingState {
  currentBooking: BookingDetails | null
  setBookingDetails: (details: Partial<BookingDetails>) => void
  clearBooking: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  currentBooking: null,
  setBookingDetails: (details) =>
    set((state) => ({
      currentBooking: state.currentBooking
        ? { ...state.currentBooking, ...details }
        : { ...details } as BookingDetails,
    })),
  clearBooking: () => set({ currentBooking: null }),
}))