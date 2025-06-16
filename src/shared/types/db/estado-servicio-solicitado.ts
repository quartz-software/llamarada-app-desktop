import { Servicio } from "./servicio";

export interface EstadoServicioSolicitado {
  id: number;
  nombre: "activo" | "pendiente" | "finalizado" | "cancelado";

  servicios?: Servicio;
}
