import { Habitacion } from "./habitacion";

export interface Ocupacion {
  id: number;
  fecha: Date;
  idHabitacion: number;

  habitacion?: Habitacion;
}
