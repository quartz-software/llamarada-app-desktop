import { Habitacion } from "./habitacion";

export interface EstadoHabitacion {
  id: number;
  nombre:
    | "disponible"
    | "ocupada"
    | "reservada"
    | "mantenimiento"
    | "limpieza"
    | "bloqueada"
    | "no disponible";

  habitaciones?: Habitacion[];
}
