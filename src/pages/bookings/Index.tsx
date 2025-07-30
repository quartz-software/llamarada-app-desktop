import CardRoom from "../bookings/components/CardRoom";
import { useEffect, useState } from "react";
import { Habitacion } from "@/shared/types/db/habitacion";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";

const Habitaciones = () => {

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [roomsData, setRoomsData] = useState<Habitacion[]>([]);

  async function getData() {
    try {
      const startDate = dateRange?.from?.toISOString().split('T')[0]
      const endDate = dateRange?.from?.toISOString().split('T')[0]
      const params = `?startDate=${startDate}&endDate=${endDate}`
      const url =
        "/api/bookings/available" +
        (dateRange && dateRange.from && dateRange.to ? params : "");
      const cont = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(url, cont)
      const data = await res.json()
      setRoomsData(data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [dateRange]);

  return (
    <div className="space-y-3">
      <h3 className="font-bold ">Busqueda</h3>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "min-w-2xs pl-3 text-left font-normal",
              dateRange && "text-muted-foreground"
            )}
          >
            {dateRange && dateRange.from && dateRange.to ?
              format(dateRange.from, "PPP") + " - " + format(dateRange.to, "PPP") :
              <span>CheckIn - CheckOut</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={dateRange}
            onSelect={(date) => setDateRange(date)}
            disabled={(date) =>
              date <= new Date()
            }
            captionLayout="label"
          />
        </PopoverContent>
      </Popover>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {roomsData.map((room, index) => {
          return (
            <CardRoom
              key={index}
              room={room}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Habitaciones;
