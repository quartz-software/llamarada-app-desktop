import { Servicio } from "./servicio";

export interface PromocionServicio {
  id: number;
  fechaInicio: Date;
  fechaFin: Date;
  precio: number;
  activo: boolean;
  idServicio: number;

  servicio?: Servicio;
}
