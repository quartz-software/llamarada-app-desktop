import { useLocation, useNavigate } from "react-router-dom";
import "./BookingForm.css";
import { useEffect, useState } from "react";
import ModalClientForm from "./components/ModalClientForm";
import { Habitacion } from "@/shared/types/db/habitacion";
import { Cliente } from "@/shared/types/db/cliente";
import { z } from "zod";
import { ReservaCreateSchema } from "@/shared/schemas/models/reserva";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { toast } from "sonner";

const BookingForm = () => {
  const nav = useNavigate();
  const location = useLocation();
  const room = location.state?.room as Habitacion;
  const [clientsData, setClientsData] = useState<Cliente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  type ReservaType = z.infer<typeof ReservaCreateSchema>

  const form = useForm<ReservaType>({
    resolver: zodResolver(ReservaCreateSchema),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = form

  const postData = async (data: ReservaType) => {
    try {

      let url = "/api/bookings";
      let cont = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCliente: data.idCliente,
          numAdultos: data.numAdultos,
          numNinos: data.numNinos,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          origenReserva: "system",
          rooms: [room.id],
        }),
      };

      const res = await fetch(url, cont)
      if (res.status == 200) {
        toast.success("Reseva creada")
        nav("/bookings");
      }
    } catch (error) {
      toast.success("Hubo un error al crear la reseva")
      console.error(error);
    }
  }

  async function getClients() {
    try {
      let url = "/api/clients";
      let cont = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(url, cont)
      const data = await res.json()
      setClientsData(data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getClients();
  }, []);
  // console.log("Errores del formulario:", form.formState.errors);
  return (
    <div className="w-full max-w-3">
      <div className="info--room my-10">
        <h3>DETALLES DE HABITACIÓN</h3>
        <div className="info--row">
          <div>
            <h4>N HABITACIÓN:</h4>
            <span>{room.numeroHabitacion}</span>
          </div>
          <div>
            <h4>TIPO:</h4>
            <span>{room.tipo?.nombre}</span>
          </div>
          <div>
            <h4>ESTADO:</h4>
            <span>{room.estado?.nombre}</span>
          </div>
        </div>
        <div className="info--row">
          <div>
            <h4>DESCIPCIÓN:</h4>
            <span>{room.descripcion}</span>
          </div>
          <div></div>
          <div>
            <h4>PRECIO:</h4>
            <span>{room.tarifas?.[0]?.precio ?? "N/A"}</span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(postData)}
        >
          <div className="grid grid-cols-2 xl:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="idCliente"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>CLIENTE:</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <select
                        name=""
                        id=""
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option>--- Seleccione un cliente ---</option>
                        {
                          clientsData.map((client, index) => (
                            <option key={index} value={client.id}>
                              {`${client.dni}\t|\t${client.nombre1} ${client.nombre2} ${client.apellido1} ${client.apellido2}`}
                            </option>
                          ))
                        }
                      </select>
                      <ModalClientForm reloadClients={() => { getClients() }} />
                      {isModalOpen && (
                        <ModalClientForm
                          reloadClients={() => {
                            setIsModalOpen(false);
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="numAdultos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NUMERO DE ADULTOS:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Cantidad de adultos"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="numNinos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NUMERO DE NIÑOS:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Cantidad de menores de edad"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>FECHA DE INGRESO:</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            new Date() > date
                          }
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
              name="checkOut"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>FECHA DE SALIDA:</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 justify-end">
            <Button type="submit">
              Reservar
            </Button>
            <Button
              type="button"
              onClick={() => nav("/bookings")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div >
  );
};

export default BookingForm;
