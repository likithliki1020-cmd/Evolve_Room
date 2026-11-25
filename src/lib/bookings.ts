export type BookingStatus = "pending" | "confirmed" | "paid" | "cancelled";

export interface Booking {
  id: string;
  name: string;
  email: string; // always stored lowercase
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
  amount?: number; // in INR (rupees)
  status: BookingStatus;
  paymentId?: string;
  receiptUrl?: string;
  createdAt?: string;
}

export const formatINR = (amount?: number) =>
  amount == null ? "—" : `₹${amount.toLocaleString("en-IN")}`;

// Converts a MongoDB document into a plain object the browser can use
export function serializeBooking(doc: any): Booking {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return {
    ...rest,
    id: String(_id),
    createdAt: createdAt ? new Date(createdAt).toISOString() : undefined,
  };
}