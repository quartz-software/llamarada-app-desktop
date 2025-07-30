import { useEffect, useState } from "react";
import "./Index.css";
import { useNavigate } from "react-router-dom";
import { Habitacion } from "@/shared/types/db/habitacion";
import RoomList from "./components/RoomList";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";

const Index = () => {
  const nav = useNavigate();
  const [roomsData, setRoomsData] = useState<Habitacion[]>([]);

  const [searchNumero, setSearchNumero] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState("all")

  const filteredRooms = roomsData.filter((room) => {
    const matchesNumero = room.numeroHabitacion.includes(searchNumero)
    const matchesTipo = tipoFiltro === "all" ? true : room.tipo?.nombre?.toLowerCase() === tipoFiltro
    return matchesNumero && matchesTipo
  })

  async function getData() {
    try {
      const url = "/api/rooms";
      const res = await fetch(url)
      const data = await res.json()
      setRoomsData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="flex gap-4">
          <div>
            <Label className="mb-2">Buscar</Label>
            <Input
              placeholder="Número de habitación..."
              value={searchNumero}
              onChange={(e) => setSearchNumero(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2">Tipo</Label>
            <Select
              value={tipoFiltro}
              onValueChange={(value) => setTipoFiltro(value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Tipo de habitación" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={() => { nav(`/rooms/form`); }}
        >
          Agregar
        </Button>
      </div>
      <RoomList rooms={filteredRooms} />
    </div >
  );
};

export default Index;
