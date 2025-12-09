import BookingList from "./components/BookingList";
import { useEffect, useState } from "react";
import { Reserva } from "@/shared/types/db/reserva";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

const ViewBookingTab = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const [bookings, setBookings] = useState<Reserva[]>([]);

  const [searchClient, setSearchClient] = useState("")
  const [searchRoom, setSearchRoom] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const filteredBookings = bookings.filter((b) => {
    const fullName =
      `${b.cliente?.nombre1 ?? ""} ${b.cliente?.nombre2 ?? ""} ${b.cliente?.apellido1 ?? ""} ${b.cliente?.apellido2 ?? ""}`
        .toLowerCase()
        .trim();

    const matchesClient = fullName.includes(searchClient.toLowerCase());

    const matchesRoom =
      b.habitaciones?.[0].numeroHabitacion.toLowerCase().includes(searchRoom.toLowerCase());

    const matchesState =
      stateFilter === "all" ? true : String(b.idEstado) === stateFilter

    return matchesClient && matchesRoom && matchesState;
  })

  async function getBookinsData() {
    try {
      let url = `${API_BASE_URL}/api/bookings/`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (res.status === 200) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBookinsData();
  }, []);

  return (
    <div className="space-y-5">
      <h2 className="font-bold">Gestion de reservas</h2>

      <div className="flex gap-4">
        <div>
          <Label className="mb-2">Habitacion</Label>
          <Input
            placeholder="Numero..."
            value={searchRoom}
            onChange={(e) => setSearchRoom(e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-2">Cliente</Label>
          <Input
            placeholder="Cliente..."
            value={searchClient}
            onChange={(e) => setSearchClient(e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-2">Estado</Label>
          <Select
            value={stateFilter}
            onValueChange={(value) => setStateFilter(value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Tipo de habitación" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="1">Activo</SelectItem>
                {/* <SelectItem value="2">Pendiente</SelectItem> */}
                <SelectItem value="3">Finalizado</SelectItem>
                <SelectItem value="4">Cancelado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <BookingList
        bookings={filteredBookings}
      />

    </div>
  );
}

export default ViewBookingTab;