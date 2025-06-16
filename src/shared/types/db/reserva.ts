import { Cliente } from "./cliente";
import { Empleado } from "./empleado";
import { EstadoReserva } from "./estado-reserva";
import { Habitacion } from "./habitacion";
import { Pago } from "./pago";
import { ServicioSolicitado } from "./servicio-solicitado";

export interface Reserva {
  id: number;
  numAdultos: number;
  numNinos: number;
  checkIn: Date;
  checkOut: Date;
  checkOutReal?: Date;
  precioTotal?: number;
  origenReserva: "web" | "system";
  createdAt: Date;

  idEmpleado?: number;
  idEstado: number;
  idCliente: number;

  empleado?: Empleado;
  cliente?: Cliente;
  estado?: EstadoReserva;
  habitaciones?: Habitacion[];
  pagos?: Pago[];
  servicios?: ServicioSolicitado[];
}
