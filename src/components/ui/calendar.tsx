"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "text-center text-sm font-semibold mb-4",
        caption_label: "text-sm font-semibold",
        nav: "flex justify-between items-center mb-4",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse space-y-0",
        head_row: "grid grid-cols-7 gap-0 mb-2",
        head_cell: "text-muted-foreground text-xs font-bold text-center h-8 flex items-center justify-center",
        row: "grid grid-cols-7 gap-0",
        cell: "p-0",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-full p-0 font-normal text-sm rounded-none hover:bg-accent"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary",
        day_today: "bg-secondary font-bold",
        day_outside: "text-muted-foreground opacity-40",
        day_disabled: "text-muted-foreground opacity-40 cursor-not-allowed",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4" {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
