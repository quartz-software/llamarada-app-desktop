import { Empleado } from "./empleado";

export interface EstadoEmpleado {
  id: number;
  nombre: "activo" | "inactivo" | "entrenamiento" | "despedido";

  empleados?: Empleado[];
}
