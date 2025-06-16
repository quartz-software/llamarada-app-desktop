import { Reserva } from "./reserva";
import { Usuario } from "./usuario";

export interface Cliente {
  id: number;
  dni: string;
  nombre1: string;
  nombre2?: string;
  apellido1: string;
  apellido2?: string;
  telefono?: string;
  pais: string;

  idUsuario: number;

  usuario?: Usuario;
  reservas?: Reserva[];
}
