import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/lib/bookings";

const styles: Record<BookingStatus, string> = {
    pending: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
    confirmed: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    paid: "bg-green-500/15 text-green-600 border-green-500/30",
    cancelled: "bg-red-500/15 text-red-500 border-red-500/30",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
    return (
        <Badge variant="outline" className={cn("uppercase tracking-widest text-[10px]", styles[status])}>
            {status}
        </Badge>
    );
}