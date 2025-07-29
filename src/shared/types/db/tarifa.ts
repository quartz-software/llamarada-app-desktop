import { Habitacion } from "./habitacion";

export interface Tarifa {
  id: number;
  fechaInicio?: Date;
  fechaFin?: Date;
  precio: number;
  activo: boolean;

  habitacionesIds?: number[];
}
