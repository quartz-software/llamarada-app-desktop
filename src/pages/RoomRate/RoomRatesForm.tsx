import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Habitacion } from "@/shared/types/db/habitacion";
import { z } from "zod";
import { TarifaCreateSchema } from "@/shared/schemas/models/tarifa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Switch } from "@/shared/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { format, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { toast } from "sonner";

const RoomRatesForm = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  type TarifaType = z.infer<typeof TarifaCreateSchema>

  const form = useForm<TarifaType>({
    resolver: zodResolver(TarifaCreateSchema),
    defaultValues: {
      fechaInicio: new Date(),
      fechaFin: new Date(),
      precio: 0,
      activo: true,
    }
  })

  const { handleSubmit, control, reset, formState: { isSubmitting } } = form

  const [roomsData, setRoomsData] = useState<Habitacion[]>([]);
  const [roomsSelect, setRoomsSelect] = useState<Habitacion[]>([]);

  const [roomFilter1, setRoomFilter1] = useState("");
  const [roomFilter2, setRoomFilter2] = useState("");

  async function getData() {
    try {
      const res = await fetch(`/api/rates/${id}`)
      const data = await res.json()
      reset(data);
      getRoomsData(data.habitaciones ?? [])
    } catch (error) {
      console.error(error);
    }
  }
  async function getRoomsData(habitacionesIds: number[] = []) {
    try {
      const res = await fetch("/api/rooms");
      const allRooms: Habitacion[] = await res.json();

      const habitacionesIdsSet = new Set(habitacionesIds);

      const habitacionesSeleccionadas = allRooms.filter((room) =>
        habitacionesIdsSet.has(room.id)
      );

      const habitacionesDisponibles = allRooms.filter(
        (room) => !habitacionesIdsSet.has(room.id)
      );

      setRoomsSelect(habitacionesSeleccionadas)
      setRoomsData(habitacionesDisponibles);
    } catch (error) {
      console.error(error);
    }
  }

  const saveData = async (data: TarifaType) => {
    try {
      let url = `/api/rates/${id ? id : ""}`;
      const method = id == null ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin,
          precio: data.precio,
          activo: data.activo,
          rooms: roomsSelect.map((h) => h.id),
        }),
      });

      if (res.status == 201 || res.status == 204) {
        toast.success("Tarifa guardada")
        navigate("/rates");
      }
      else {
        toast.error("No se pudo guardar la tarifa")
      }
    } catch (error) {
      toast.error("No se pudo guardar la tarifa")
      console.error(error);
    }
  }

  function searchRooms(search: string, arr: Habitacion[]) {
    if (!search.trim()) return arr;
    return arr.filter(
      (room) =>
        room.tipo?.nombre.includes(search) ||
        room.numeroHabitacion.includes(search)
    );
  }

  useEffect(() => {
    if (id != null) {
      getData();
    } else {
      getRoomsData();
    }
  }, [id]);
  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">Tarifa</h1>
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={handleSubmit(saveData)}
        >
          <FormField
            control={control}
            name="precio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo:</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Precio"
                    value={field.value?.toFixed(2) ?? ""}
                    min={0}
                    step="0.01"
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      field.onChange(isNaN(val) ? 0 : val);
                    }}
                    onBlur={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) {
                        field.onChange(parseFloat(val.toFixed(2)));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="activo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disponible</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaInicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de inicio:</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                          form.formState.errors.fechaInicio && "border-red-500"

                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        defaultMonth={field.value}
                        disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaFin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de finalizacion:</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                          form.formState.errors.fechaFin && "border-red-500"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        defaultMonth={field.value}
                        disabled={(date) => new Date() > date}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className="font-bold col-span-2">Habitaciones</h2>
          <div>
            <Label className="mb-2">Habitaciones seleccionadas</Label>
            <Input
              placeholder="Buscar: Numero de habitacion / Tipo"
              value={roomFilter1}
              onChange={(e) => setRoomFilter1(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2">Habitaciones disponibles</Label>
            <Input
              placeholder="Buscar: Numero de habitacion / Tipo"
              value={roomFilter2}
              onChange={(e) => setRoomFilter2(e.target.value)}
            />
          </div>
          <div className="bg-muted/30 p-4 rounded-xl border col-span-2">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 min-h-[250px]">
              {/* Columna de habitaciones seleccionadas */}
              <div className="space-y-2">
                {searchRooms(roomFilter1, roomsSelect ?? []).map((room, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white border rounded-lg shadow-sm"
                  >
                    <div className="space-x-3">
                      <span className="font-medium text-sm text-muted-foreground">{index + 1}.</span>
                      <span>{room.numeroHabitacion}</span>
                      <span className="text-muted-foreground text-sm">{room.tipo?.nombre}</span>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setRoomsSelect((roomsSelect ?? []).filter((r) => r.id !== room.id));
                        setRoomsData([...roomsData, room]);
                      }}
                    >
                      <Minus className="text-destructive w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Separator orientation="vertical" />

              {/* Columna de habitaciones disponibles */}
              <div className="space-y-2">
                {searchRooms(roomFilter2, roomsData).map((room, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white border rounded-lg shadow-sm"
                  >
                    <div className="space-x-3">
                      <span className="font-medium text-sm text-muted-foreground">{index + 1}.</span>
                      <span>{room.numeroHabitacion}</span>
                      <span className="text-muted-foreground text-sm">{room.tipo?.nombre}</span>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setRoomsSelect([...(roomsSelect ?? []), room]);
                        setRoomsData(roomsData.filter((r) => r.id !== room.id));
                      }}
                    >
                      <Plus className="text-primary w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-2 text-right space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                navigate("/rates");
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RoomRatesForm;
