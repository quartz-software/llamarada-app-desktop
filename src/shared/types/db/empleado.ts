import { EstadoEmpleado } from "./estado-empleado";
import { ModificacionStock } from "./modificacion-stock";
import { Reserva } from "./reserva";
import { Tarea } from "./tarea";
import { TipoRol } from "./tipo-rol";
import { Usuario } from "./usuario";

export interface Empleado {
  id: number;
  idUsuario: number;
  idRol: number;
  idEstado: number;
  fechaContratacion: Date;
  dni: string;
  nombre1: string;
  nombre2?: string;
  apellido1: string;
  apellido2?: string;
  telefono?: string;

  estado?: EstadoEmpleado;
  rol?: TipoRol;
  usuario?: Usuario;
  reservas?: Reserva[];
  tareas?: Tarea[];
  modificaciones?: ModificacionStock[];
}
