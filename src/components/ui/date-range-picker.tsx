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
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-semibold border-0 bg-transparent hover:bg-transparent p-0 h-auto text-navy",
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
        <PopoverContent className="w-auto p-0 bg-white border-navy/10 shadow-2xl rounded-2xl overflow-hidden" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="p-3"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
