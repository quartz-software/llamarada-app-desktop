import { FC } from "react";
import "./CardRoom.css";
import { useNavigate } from "react-router-dom";
import { Habitacion } from "@/shared/types/db/habitacion";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

type Props = {
  room: Habitacion;
  checkIn?: Date;
  checkOut?: Date;
};

const CardRoom: FC<Props> = ({ room, checkIn, checkOut }) => {
  const nav = useNavigate();
  return (
    <Card className="gap-3">
      <CardHeader>
        <div className="flex">
          <Badge
            variant="secondary"
            className="bg-green-500 text-white absolute m-2"
          >
            Disponible
          </Badge>
          <img
            src={"./room1.jpg"}
            alt={`Habitación ${room.numeroHabitacion}`}
            className="object-cover rounded-md max-h-25 w-full"
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-semibold">Habitación {room.numeroHabitacion}</h2>
        <p className="text-sm text-muted-foreground">
          {room.tipo?.nombre
            ? room.tipo.nombre.charAt(0).toUpperCase() + room.tipo.nombre.slice(1)
            : ""}
        </p>
        <p className="text-sm text-muted-foreground">{room.capacidad} personas</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => nav("/bookings/create", { state: { room, checkIn, checkOut } })}
        >
          Reservar
        </Button>
      </CardFooter>
    </Card>
  );
};
export default CardRoom;
