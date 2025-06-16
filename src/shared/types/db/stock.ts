import { AbastecimientoStock } from "./abastecimiento-stock";
import { CategoriaStock } from "./categoria-stock";
import { ModificacionStock } from "./modificacion-stock";

export interface Stock {
  id: number;
  nombre: string;
  cantidad: number;
  unidadMedida: string;
  idCategoria: number;

  categoria?: CategoriaStock[];
  abastecimientos?: AbastecimientoStock[];
  modificaciones?: ModificacionStock[];
}
