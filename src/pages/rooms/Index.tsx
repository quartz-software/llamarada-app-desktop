import { useEffect, useState } from "react";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import "./Index.css";
import { useNavigate } from "react-router-dom";
import FormField from "../../shared/components/FormField";
import { Habitacion } from "@/shared/types/db/habitacion";
import RoomList from "./components/RoomList";

const Index = () => {
  const nav = useNavigate();
  const [roomsData, setRoomsData] = useState<Habitacion[]>([]);
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
    <div>
      <h1>Habitaciones</h1>
      <div className="div--search">
        <FormField label="Buscar" errorMessage="">
          <Input
            handleInput={() => { }}
            resetMessage={() => { }}
            placeholder="Buscar"
            type="text"
            value=""
          />
        </FormField>
        <Button
          disabled={false}
          handleClick={() => {
            nav(`/rooms/form`);
          }}
        >
          Agregar
        </Button>
      </div>
      <RoomList rooms={roomsData} />
    </div>
  );
};

export default Index;
