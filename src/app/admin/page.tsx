"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { formatINR, type Booking, type BookingStatus } from "@/lib/bookings";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { data: session, status } = useSession({ required: true });
    const isAdminUser = !!session?.user?.isAdmin;

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [fetching, setFetching] = useState(true);

    // Non-admins go to their own dashboard
    useEffect(() => {
        if (status === "authenticated" && !isAdminUser) router.replace("/dashboard");
    }, [status, isAdminUser, router]);

    const load = useCallback(async () => {
        setFetching(true);
        try {
            const res = await fetch("/api/admin/bookings", { cache: "no-store" });
            const json = await res.json();
            setBookings(json.bookings ?? []);
        } catch {
            setBookings([]);
        } finally {
            setFetching(false);
        }
    }, []);

    useEffect(() => {
        if (status === "authenticated" && isAdminUser) load();
    }, [status, isAdminUser, load]);

    const stats = useMemo(() => {
        const count = (s: BookingStatus) => bookings.filter((b) => b.status === s).length;
        return {
            total: bookings.length,
            pending: count("pending"),
            confirmed: count("confirmed"),
            paid: count("paid"),
            revenue: bookings.filter((b) => b.status === "paid").reduce((sum, b) => sum + (b.amount || 0), 0),
        };
    }, [bookings]);

    const setStatus = async (id: string, newStatus: BookingStatus) => {
        try {
            const res = await fetch("/api/admin/bookings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (!res.ok) throw new Error();
            setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
            toast({ title: `Booking ${newStatus}` });
        } catch {
            toast({ title: "Update failed", description: "Please try again.", variant: "destructive" });
        }
    };

    if (status !== "authenticated" || !isAdminUser) {
        return <div className="min-h-screen pt-32 px-6 text-center text-muted-foreground">Loading...</div>;
    }

    const cards = [
        { label: "Total Bookings", value: stats.total },
        { label: "Pending", value: stats.pending },
        { label: "Confirmed", value: stats.confirmed },
        { label: "Paid", value: stats.paid },
        { label: "Revenue", value: formatINR(stats.revenue) },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Manage bookings and payments</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/dashboard">
                            <Button variant="outline" className="rounded-none uppercase tracking-widest text-xs">
                                My Dashboard
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            className="uppercase tracking-widest text-xs"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            Logout
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {cards.map((c) => (
                        <div key={c.label} className="border border-border/50 bg-card p-6">
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</p>
                            <p className="text-3xl font-headline font-bold text-primary mt-2">{c.value}</p>
                        </div>
                    ))}
                </div>

                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-headline font-bold">All Bookings</h2>
                        <Button variant="ghost" size="sm" onClick={load} disabled={fetching}>
                            Refresh
                        </Button>
                    </div>

                    {fetching ? (
                        <p className="text-muted-foreground">Loading bookings...</p>
                    ) : bookings.length === 0 ? (
                        <div className="border border-border/50 bg-card p-10 text-center text-muted-foreground">
                            No bookings yet.
                        </div>
                    ) : (
                        <div className="border border-border/50 bg-card overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Service</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((b) => (
                                        <TableRow key={b.id}>
                                            <TableCell>
                                                <div className="font-medium">{b.name}</div>
                                                <div className="text-xs text-muted-foreground">{b.email}</div>
                                                {b.phone && <div className="text-xs text-muted-foreground">{b.phone}</div>}
                                            </TableCell>
                                            <TableCell>{b.service || "—"}</TableCell>
                                            <TableCell>{[b.date, b.time].filter(Boolean).join(" · ") || "—"}</TableCell>
                                            <TableCell>{formatINR(b.amount)}</TableCell>
                                            <TableCell>
                                                <BookingStatusBadge status={b.status} />
                                            </TableCell>
                                            <TableCell className="text-right space-x-2 whitespace-nowrap">
                                                {b.status === "pending" && (
                                                    <Button size="sm" onClick={() => setStatus(b.id, "confirmed")}>
                                                        Confirm
                                                    </Button>
                                                )}
                                                {(b.status === "pending" || b.status === "confirmed") && (
                                                    <Button size="sm" variant="outline" onClick={() => setStatus(b.id, "cancelled")}>
                                                        Cancel
                                                    </Button>
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