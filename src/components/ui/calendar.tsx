"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-2 relative items-center h-10",
        caption_label: "text-base font-bold text-navy tracking-tight",
        nav: "flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-2 rounded-full border border-border"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-2 rounded-full border border-border"
        ),
        month_grid: "w-full border-collapse space-y-1 mt-4",
        weekdays: "flex justify-between",
        weekday: "text-navy/30 rounded-md w-10 font-black text-[0.7rem] uppercase tracking-widest text-center",
        week: "flex w-full mt-1.5 justify-between",
        day: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-xl [&:has([aria-selected].day-outside)]:bg-saffron/20 [&:has([aria-selected])]:bg-saffron/10 first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-semibold aria-selected:opacity-100 transition-all duration-300 rounded-xl"
        ),
        range_start: "day-range-start bg-saffron text-white rounded-l-xl shadow-lg shadow-saffron/40",
        range_end: "day-range-end bg-saffron text-white rounded-r-xl shadow-lg shadow-saffron/40",
        selected:
          "bg-saffron text-white hover:bg-saffron hover:text-white focus:bg-saffron focus:text-white",
        today: "bg-secondary text-navy font-black",
        outside:
          "day-outside text-muted-foreground opacity-20 aria-selected:bg-saffron/20 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-20",
        range_middle:
          "aria-selected:bg-saffron/10 aria-selected:text-navy font-bold",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => props.orientation === "left" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
