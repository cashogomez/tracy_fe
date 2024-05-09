export interface Estatus {
    id: number;
    nombre: string;

}
export type EstatusRequest = Omit<Estatus, 'id'>;