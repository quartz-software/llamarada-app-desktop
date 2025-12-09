import { Button } from "@/shared/components/ui/button"
import { Calendar } from "@/shared/components/ui/calendar"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { cn } from "@/shared/lib/utils"
import { ReservaUpdateSchema } from "@/shared/schemas/models/reserva"
import { Reserva } from "@/shared/types/db/reserva"
import { capitalise } from "@/shared/utils/capitalise"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import AlertBookingFinishied from "./components/AlertBookingFinishied"


const InfoRoom: FC<{ detail: string, data: string | undefined }> = ({ detail, data }) => {
  return (
    <div className="flex gap-4">
      <h4 className="text-primary">{detail}</h4>
      <span>{data ?? "N/A"}</span>
    </div>
  )
}
const BookingDetailsForm = () => {
  const { id } = useParams()

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token")

  const nav = useNavigate();

  const [isAlertOpen, setAlertOpen] = useState(false)

  const [bookingData, setBookingData] = useState<Reserva>()
  const [clienteName, setClienteName] = useState("")

  type ReservaType = z.infer<typeof ReservaUpdateSchema>

  const form = useForm<ReservaType>({
    resolver: zodResolver(ReservaUpdateSchema),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = form

  const putData = async (data: ReservaType) => {
    try {
      let url = `${API_BASE_URL}/api/bookings/${id}`;
      let cont = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          numAdultos: data.numAdultos,
          numNinos: data.numNinos,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          rooms: bookingData?.habitaciones?.[0]?.id ? [bookingData.habitaciones[0].id] : []
        }),
      };
      const res = await fetch(url, cont)
      if (res.status == 200) {
        toast.success("Reserva actualizada")
        nav("/bookings");
      }
      else if (res.status == 500) {
        const errorMessage = await res.json();
        toast.error(errorMessage.message)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFinished = () => {
    setAlertOpen(true)
  }

  const finishedBooking = async () => {
    try {
      let url = `${API_BASE_URL}/api/bookings/finished/${id}`;
      let cont = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
      };
      const res = await fetch(url, cont)
      if (res.status === 200) {
        toast.success("Reserva finalizada")
        nav("/bookings");
      }
    } catch (error) {
      toast.error("Hubo un error al terminar la reserva")
    }
  }

  async function getBookingData() {
    try {
      let url = `${API_BASE_URL}/api/bookings/${id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      })
      const data = await res.json();
      setBookingData(data);
      reset(data)
      setClienteName(`${data.cliente.nombre1} ${data.cliente.nombre2} ${data.cliente.apellido1} ${data.cliente.apellido2}`)

    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getBookingData();
  }, [])
  if (!bookingData) return <p>Cargando...</p>;
  return (
    <div className="space-y-7">
      <AlertBookingFinishied
        open={isAlertOpen}
        setOpen={setAlertOpen}
        onFinished={finishedBooking}
      />
      <Card>
        <CardHeader className="text-primary">DETALLES DE HABITACIÓN</CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-y-7">
          <InfoRoom detail="N° HABITACION:" data={bookingData?.habitaciones?.[0]?.numeroHabitacion} />
          <InfoRoom detail="TIPO:" data={capitalise(bookingData?.habitaciones?.[0]?.tipo?.nombre ?? "")} />
          <InfoRoom detail="ESTADO:" data={capitalise(bookingData?.habitaciones?.[0]?.estado?.nombre ?? "")} />
          <InfoRoom detail="DESCRIPCIÓN:" data={bookingData?.habitaciones?.[0]?.descripcion} />
          <InfoRoom detail="PRECIO:" data={bookingData?.precioTotal?.toString()} />
        </CardContent>
      </Card>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(putData)}
        >
          <div className="grid grid-cols-2 xl:grid-cols-2 gap-6">
            <FormItem className="col-span-2">
              <Label>CLIENTES:</Label>
              <Input className="col-span-2"
                value={clienteName}
                placeholder="Cantidad de adultos"
                readOnly
              />
            </FormItem>
            <FormField
              control={control}
              name="numAdultos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NUMERO DE ADULTOS:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      min={0}
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
                      min={0}
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
                <FormItem>
                  <FormLabel>FECHA DE INGRESO:</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                            form.formState.errors.checkIn && "border-red-500"

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
                            !field.value && "text-muted-foreground",
                            form.formState.errors.checkOut && "border-red-500"

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
            <Button type="submit" disabled={isSubmitting}>
              {!isSubmitting ? "Guardar" : "Guardando..."}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleFinished}
            >
              Terminar reserva
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => nav("/bookings")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default BookingDetailsForm