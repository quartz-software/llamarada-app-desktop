import { Stock } from "./stock";

export interface CategoriaStock {
  id: number;
  nombre: "food" | "maintenance" | "cleaning";

  stocks?: Stock[];
}
