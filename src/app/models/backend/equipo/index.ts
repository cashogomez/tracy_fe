import { Estatus } from "../estatus";

export interface Equipo {
    id: number;
    numero: number;
    nombre: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    estatus: string;
    prueba: string;
}
export type EquipoRequest = Omit<Equipo, 'id'>;