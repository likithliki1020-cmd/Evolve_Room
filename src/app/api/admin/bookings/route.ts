import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { serializeBooking } from "@/lib/bookings";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return !!session?.user?.isAdmin;
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const db = await getDb();
  const docs = await db.collection("bookings").find({}).sort({ createdAt: -1 }).toArray();
  return NextResponse.json({ bookings: docs.map(serializeBooking) });
}

export async function PATCH(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, status } = await req.json();
  if (!ObjectId.isValid(id) || !["pending", "confirmed", "paid", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const db = await getDb();
  await db
    .collection("bookings")
    .updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } });
  return NextResponse.json({ ok: true });
}