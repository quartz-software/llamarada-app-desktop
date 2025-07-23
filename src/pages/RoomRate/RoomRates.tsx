import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomRates.css";
import { Tarifa } from "@/shared/types/db/tarifa";
import RoomRateList from "./components/RoomRateList";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

const RoomRates = () => {
  const nav = useNavigate();
  const [roomRatesData, setRoomRatesData] = useState<Tarifa[]>([]);
  const [searchText, setSearchText] = useState("")

  async function getData() {
    try {
      let url = "/api/rates";
      const res = await fetch(url)
      const data = await res.json()
      setRoomRatesData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const filteredRates = roomRatesData.filter((rate) =>
    rate.precio.toString().includes(searchText)
  )

  return (
    <div className="space-y-5">
      <h1 className="font-bold text-2xl">Tarifas de habitación</h1>
      <div className="flex justify-between items-end">
        <div>
          <Label className="mb-2 block">Buscar por precio</Label>
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-[200px]"
          />
        </div>
        <Button onClick={() => nav("/rates/edit")}>Agregar</Button>
      </div>
      <RoomRateList rates={filteredRates} />
    </div>
  );
};

export default RoomRates;
