export interface Turno{
    id: number;
    numero: number;
    inicio: string;
    fin: string;
}
export type TurnoRequest = Omit<Turno, 'id'>;