import { Empleado } from "./empleado";
import { EstadoTarea } from "./estado-tarea";
import { ServicioSolicitado } from "./servicio-solicitado";

export interface Tarea {
  id: number;
  idEstado: number;
  idEmpleado: number;
  idServicio: number;
  descripcion: string;
  observaciones?: string;
  fechaInicio: Date;
  fechaCompletado?: Date;
  createdAt: Date;

  estado?: EstadoTarea;
  servicio?: ServicioSolicitado;
  empleado?: Empleado;
}
