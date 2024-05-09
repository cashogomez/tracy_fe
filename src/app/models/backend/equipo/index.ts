import { Estatus } from "../estatus";
import { Ciclo } from "../ciclo";

export interface Equipo {
    id: number;
    nombre: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    estatus: Estatus;
    ciclos: Ciclo; 
}
export type EquipoRequest = Omit<Equipo, 'id'>;