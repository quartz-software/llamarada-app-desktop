import { Habitacion } from "./habitacion";

export interface ImagenHabitacion {
  id: number;
  tipoImagen: "panoramica" | "3d" | "plano";
  url: string;
  descripcion?: string;
  idHabitacion: number;

  habitacion?: Habitacion;
}
