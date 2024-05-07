"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "@/components/rides_form/TimePicker";

const DatePicker = ({ field }: { field: any }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "mt-2 w-full justify-start text-left font-normal",
            !field.value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 " />
          {field.value ? (
            format(field.value, "PPP HH:mm")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
          disabled={(date) =>
            // @ts-ignore
            date < new Date().setHours(0, 0, 0, 0) ||
            date < new Date("1900-01-01")
          }
        />
        <div className="border-t border-border p-3">
          <TimePickerDemo setDate={field.onChange} date={field.value} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
