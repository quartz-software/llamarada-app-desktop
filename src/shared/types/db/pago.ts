import { DetallePago } from "./detalle-pago";
import { Reserva } from "./reserva";

export interface Pago {
  id: number;
  fechaPago: Date;
  montoTotal: number;
  metodo: string;
  idReserva: string;

  detalles?: DetallePago[];
  reserva?: Reserva;
}
