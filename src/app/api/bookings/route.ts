import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { serializeBooking } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // TODO (when the email API is connected): only return bookings if this
  // user's email is verified (users.emailVerified === true).
  const db = await getDb();
  const docs = await db.collection("bookings").find({ email }).sort({ createdAt: -1 }).toArray();
  return NextResponse.json({ bookings: docs.map(serializeBooking) });
}