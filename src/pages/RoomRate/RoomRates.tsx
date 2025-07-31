import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomRates.css";
import { Tarifa } from "@/shared/types/db/tarifa";
import RoomRateList from "./components/RoomRateList";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import AlertDelete from "@/shared/components/AlertDelete";
import { toast } from "sonner";

const RoomRates = () => {
  const nav = useNavigate();
  const [roomRatesData, setRoomRatesData] = useState<Tarifa[]>([]);
  const [searchText, setSearchText] = useState("")
  const [itemToDelete, setItemToDelete] = useState(0)
  const [isAlertOpen, setAlertOpen] = useState(false);

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

  const OpenAlertDelet = (id: number) => {
    setItemToDelete(id);
    setAlertOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/rates/${id}`, { method: "DELETE" })
      if (res.status === 204) {
        getData();
        setAlertOpen(false);
        toast.success("Tarifa eliminado")
      }
      else if (res.status === 500) {
        toast.error("No se pudo eliminar la tarifa")
      }
    } catch (error) {
      console.error(error);

    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredRates = roomRatesData.filter((rate) =>
    rate.precio.toString().includes(searchText)
  )

  return (
    <div className="space-y-5">
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
      <AlertDelete
        id={itemToDelete}
        onDelete={handleDelete}
        open={isAlertOpen}
        setOpen={setAlertOpen}
      />
      <RoomRateList
        rates={filteredRates}
        onDelete={OpenAlertDelet}
      />
    </div>
  );
};

export default RoomRates;
