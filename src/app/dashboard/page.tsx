"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookingDialog } from "@/components/booking-dialog";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { formatINR, type Booking } from "@/lib/bookings";

export default function DashboardPage() {
    const { data: session, status } = useSession({ required: true });
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [fetching, setFetching] = useState(true);

    const load = useCallback(async () => {
        setFetching(true);
        try {
            const res = await fetch("/api/bookings", { cache: "no-store" });
            const json = await res.json();
            setBookings(json.bookings ?? []);
        } catch {
            setBookings([]);
        } finally {
            setFetching(false);
        }
    }, []);

    useEffect(() => {
        if (status === "authenticated") load();
    }, [status, load]);

    if (status !== "authenticated") {
        return <div className="min-h-screen pt-32 px-6 text-center text-muted-foreground">Loading...</div>;
    }

    const user = session.user;

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">My Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Welcome, {user.name || user.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <BookingDialog
                            trigger={
                                <Button className="rounded-none uppercase tracking-widest text-xs bg-primary text-primary-foreground">
                                    Book a Session
                                </Button>
                            }
                        />
                        {user.isAdmin && (
                            <Link href="/admin">
                                <Button variant="outline" className="rounded-none uppercase tracking-widest text-xs">
                                    Admin
                                </Button>
                            </Link>
                        )}
                        <Button
                            variant="ghost"
                            className="uppercase tracking-widest text-xs"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            Logout
                        </Button>
                    </div>
                </div>

                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-headline font-bold">My Sessions</h2>
                        <Button variant="ghost" size="sm" onClick={load} disabled={fetching}>
                            Refresh
                        </Button>
                    </div>

                    {fetching ? (
                        <p className="text-muted-foreground">Loading your sessions...</p>
                    ) : bookings.length === 0 ? (
                        <div className="border border-border/50 bg-card p-10 text-center text-muted-foreground">
                            No sessions yet. Bookings made with <strong>{user.email}</strong> will appear here.
                        </div>
                    ) : (
                        <div className="border border-border/50 bg-card overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Service</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Receipt</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((b) => (
                                        <TableRow key={b.id}>
                                            <TableCell className="font-medium">{b.service || "—"}</TableCell>
                                            <TableCell>{[b.date, b.time].filter(Boolean).join(" · ") || "—"}</TableCell>
                                            <TableCell>{formatINR(b.amount)}</TableCell>
                                            <TableCell>
                                                <BookingStatusBadge status={b.status} />
                                            </TableCell>
                                            <TableCell>
                                                {b.receiptUrl ? (
                                                    <a href={b.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                                        View
                                                    </a>
                                                ) : (
                                                    "—"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}