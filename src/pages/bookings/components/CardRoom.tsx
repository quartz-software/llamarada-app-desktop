import { FC } from "react";
import "./CardRoom.css";
import { useNavigate } from "react-router-dom";
import { Habitacion } from "@/shared/types/db/habitacion";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

type Props = {
  room: Habitacion;
};

const CardRoom: FC<Props> = ({ room }) => {
  const nav = useNavigate();
  return (
    <Card >
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge
            variant="secondary"
            className="bg-green-500 text-white dark:bg-blue-600"
          >
            Disponible
          </Badge>
          <img
            src={"./room1.jpg"}
            alt={`Habitación ${room.numeroHabitacion}`}
            className="absolute right-6 w-24 h-14 object-cover rounded-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-semibold">Habitación {room.numeroHabitacion}</h2>
        <p className="text-sm text-muted-foreground">{room.tipo?.nombre}</p>
        <p className="text-sm text-muted-foreground">{room.capacidad} personas</p>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={() => nav("/bookings/create", { state: { room } })}
        >
          Reservar
        </Button>
      </CardFooter>
    </Card>
  );
};
export default CardRoom;
