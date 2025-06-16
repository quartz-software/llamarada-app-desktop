import { EstadoHabitacion } from "./estado-habitacion";
import { ImagenHabitacion } from "./imagen-habitacion";
import { Ocupacion } from "./ocupacion";
import { Reserva } from "./reserva";
import { Servicio } from "./servicio";
import { ServicioSolicitado } from "./servicio-solicitado";
import { Tarifa } from "./tarifa";
import { TipoHabitacion } from "./tipo-habitacion";

export interface Habitacion {
  id: number;
  numeroHabitacion: string;
  capacidad: number;
  descripcion?: string;
  idEstadoHabitacion: number;
  idTipoHabitacion: number;

  serviciosSolicitados?: ServicioSolicitado[];
  servicios?: Servicio[];
  tarifas?: Tarifa[];
  ocupaciones?: Ocupacion[];
  imagenes?: ImagenHabitacion[];
  tipo?: TipoHabitacion;
  estado?: EstadoHabitacion;
  reservas?: Reserva[];
}
