export interface Ciclo {
    id: number;
    nombre: string;
    duracion: string;
    temperatura: number;

}
export type CicloRequest = Omit<Ciclo, 'id'>;