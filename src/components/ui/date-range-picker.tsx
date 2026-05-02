"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: {
  className?: string;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleSelect = (newDate: DateRange | undefined) => {
    let selection = newDate;

    // Fresh start logic: if we already have a complete range, start a new one on next click
    if (date?.from && date?.to && newDate?.from && newDate?.to) {
      // Determine which date was actually clicked (the one that differs from our current range)
      const isFromChanged = newDate.from.getTime() !== date.from.getTime();
      const newlySelected = isFromChanged ? newDate.from : newDate.to;
      selection = { from: newlySelected, to: undefined };
    }

    setDate(selection);

    // Auto-close when a full range (from AND to) is completed
    if (selection?.from && selection?.to) {
      // Use a small timeout to ensure the UI updates before closing on mobile
      setTimeout(() => setOpen(false), 150);
    }
  };

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-semibold border-0 bg-transparent hover:bg-transparent p-0 h-auto text-navy hover:text-navy data-[state=open]:text-navy",
              !date && "text-navy/50"
            )}
          >
            <div className="flex flex-col items-start">
              {date?.from ? (
                date.to ? (
                  <span className="text-[0.9rem]">
                    {format(date.from, "MMM dd")} – {format(date.to, "MMM dd, yyyy")}
                  </span>
                ) : (
                  <span className="text-[0.9rem]">{format(date.from, "MMM dd, yyyy")}</span>
                )
              ) : (
                <span className="text-[0.9rem] opacity-50">Select Dates</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[calc(100vw-2rem)] md:w-auto p-0 bg-white border-navy/10 shadow-3xl rounded-[24px] overflow-hidden z-[100] mx-4 md:mx-0"
          align={isMobile ? "center" : "start"}
          sideOffset={12}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={isMobile ? 1 : 2}
            className="p-3"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
