import { Servicio } from "./servicio";

export interface TipoServicio {
  id: number;
  nombre: "limpieza" | "alimentos";

  servicios?: Servicio[];
}
