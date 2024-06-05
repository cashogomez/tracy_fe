export interface Incidencia {
    id: number;
    opcion: string;
    nota: string;
}
export type IncidenciaRequest = Omit<Incidencia, 'id'>;