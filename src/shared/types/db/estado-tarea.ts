import { Tarea } from "./tarea";

export interface EstadoTarea {
  id: number;
  nombre: "pendiente" | "en progreso" | "finalizado" | "cancelado";

  tareas?: Tarea[];
}
