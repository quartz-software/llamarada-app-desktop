import { EstadoServicioSolicitado } from "./estado-servicio-solicitado";
import { Habitacion } from "./habitacion";
import { Reserva } from "./reserva";
import { Servicio } from "./servicio";
import { Tarea } from "./tarea";

export interface ServicioSolicitado {
  id: number;
  descripcion: string;
  createdAt: Date;
  idEstado: number;
  idServicio: number;
  idReserva: number;
  idHabitacion: number;

  estado?: EstadoServicioSolicitado;
  servicio?: Servicio;
  reserva?: Reserva;
  habitacion?: Habitacion;
  tarea?: Tarea;
}
