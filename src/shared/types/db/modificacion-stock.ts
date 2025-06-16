import { Empleado } from "./empleado";
import { Stock } from "./stock";

export interface ModificacionStock {
  id: number;
  fecha: Date;
  cantidad: number;
  motivo?: string;
  idEmpleado: number;
  idStock: number;

  empleado?: Empleado;
  stock?: Stock;
}
