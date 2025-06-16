import { Reserva } from "./reserva";

export interface EstadoReserva {
  id: number;
  nombre: "activo" | "pendiente" | "finalizado" | "cancelado";

  reservas?: Reserva[];
}
