import { Pago } from "./pago";

export interface DetallePago {
  id: number;
  concepto: string;
  monto: number;
  pagado: boolean;
  idPago: number;
  pago?: Pago;
}
