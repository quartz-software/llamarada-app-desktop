import { Habitacion } from "./habitacion";

export interface TipoHabitacion {
  id: number;
  nombre: string;
  habitaciones?: Habitacion[];
}
