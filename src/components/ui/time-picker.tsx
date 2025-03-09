import { forwardRef, ComponentProps, useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";

// Importing shadcn Components
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";

interface TimePickerProps extends ComponentProps<"input"> {
  value?: string;
  onValueChange: (value: string) => void;
}

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ value, onValueChange, className, ...inputProps }, ref) => {
    const [hour, setHour] = useState<string>();
    const [minute, setMinute] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const hours = Array.from({ length: 24 }, (_, i) =>
      i.toString().padStart(2, "0")
    );
    const minutes = Array.from({ length: 60 }, (_, i) =>
      i.toString().padStart(2, "0")
    );

    const handleSelect = (type: "hour" | "minute", value: string) => {
      if (type === "hour") {
        setHour(value);
        setMinute((prev) => prev ?? "00");
      } else {
        setHour((prev) => prev ?? "23");
        setMinute(value);
      }
    };
    useEffect(() => {
      if (value) {
        const [h, m] = value.split(":");
        setHour(h);
        setMinute(m);
      }
    }, [value]);

    useEffect(() => {
      if (onValueChange) {
        if (hour && minute) onValueChange(`${hour}:${minute}`);
        else onValueChange(`00:00`);
      }
    }, [hour, minute, onValueChange]);

    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        {/* Hidden Input Field */}
        <input
          ref={ref}
          type="hidden"
          value={`${hour}:${minute}`}
          {...inputProps}
        />

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              onClick={() => setIsOpen((prev) => !prev)}
              className={cn(
                "min-w-32 text-left justify-between gap-4 font-normal",
                !hour && !minute && "text-muted-foreground",
                isOpen && "outline-none ring-1 ring-ring",
                className
              )}
            >
              <p className="leading-10">
                {hour || "HH"}:{minute || "MM"}
              </p>
              <Clock size={16} className={``} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 mt-2 border border-input rounded-md">
            <div className="flex flex-col sm:flex-row sm:h-[250px] divide-y sm:divide-y-0 sm:divide-x">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex flex-col p-2">
                  {hours.reverse().map((h, index) => (
                    <Button
                      key={index}
                      size="icon"
                      variant={hour === h ? "default" : "ghost"}
                      className={"sm:w-full shrink-0 aspect-square font-normal"}
                      onClick={() => handleSelect("hour", h)}
                    >
                      {h}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex flex-col p-2">
                  {minutes.map((min, index) => (
                    <Button
                      key={index}
                      size="icon"
                      variant={minute === min ? "default" : "ghost"}
                      className={"sm:w-full shrink-0 aspect-square font-normal"}
                      onClick={() => handleSelect("minute", min)}
                    >
                      {min}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

export default TimePicker;
