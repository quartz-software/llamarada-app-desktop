import { Habitacion } from "./habitacion";
import { PromocionServicio } from "./promocion-servicio";
import { ServicioSolicitado } from "./servicio-solicitado";
import { TipoServicio } from "./tipo-servicio";

export interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  restricciones?: string;
  precio: number;
  moneda: string;
  horaApertura: string;
  horaCierre: string;
  disponible: boolean;
  idTipoServicio: number;

  tipoServicio?: TipoServicio;
  serviciosSolicitados?: ServicioSolicitado[];
  promociones?: PromocionServicio[];
  habitaciones?: Habitacion[];
}
