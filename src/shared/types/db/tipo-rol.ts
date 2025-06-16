import { Empleado } from "./empleado";

export type RolEmpleado =
  | "limpieza"
  | "mantenimiento"
  | "recepcionista"
  | "administrador";
export interface TipoRol {
  id: number;
  nombre: RolEmpleado;

  empleados?: Empleado[];
}
