import { Stock } from "./stock";

export interface AbastecimientoStock {
  id: number;
  proveedor: string;
  fecha: Date;
  cantidad: number;
  idStock: number;

  stock?: Stock;
}
