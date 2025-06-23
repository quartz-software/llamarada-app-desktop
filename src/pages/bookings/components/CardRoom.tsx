import { FC } from "react";
import Button from "../../../shared/components/Button";
import "./CardRoom.css";
import { useNavigate } from "react-router-dom";
import { Habitacion } from "@/shared/types/db/habitacion";

type Props = {
  room: Habitacion;
};

const CardRoom: FC<Props> = ({ room }) => {
  const estadoClase = `room--card ${room.estado?.nombre}`;
  const nav = useNavigate();
  let cTag = room.estado?.nombre;
  return (
    <div className={estadoClase}>
      <div>
        <div className="room--info">
          <span className="tag">{cTag}</span>
          <h1>{room.numeroHabitacion}</h1>
          <h3>{room.tipo?.nombre}</h3>
          <div>{room.capacidad} personas</div>
        </div>
        <img src="./room1.jpg" alt="" />
      </div>
      <Button
        handleClick={function (): void {
          nav("/bookings/create", { state: { room } });
        }}
        disabled={false}
      >
        Reservar
      </Button>
    </div>
  );
};
export default CardRoom;
