import { Ciclo } from "../ciclo";
import { Equipo } from "../equipo";

export interface CiclosEquipo {
    id: number;
    ciclo : Ciclo;
    equipo: Equipo;
  }
  export type CiclosEquipoRequest = Omit<CiclosEquipo, 'id'>;