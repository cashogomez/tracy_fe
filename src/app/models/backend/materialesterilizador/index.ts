import { EventoEsterilizacion } from "../eventoesterilizacion"

export interface MaterialEsterilizador {
    id: number
    setId: number
    nombreSet: string
    cantidad: number
    turno: number
    eventoesterilizador: number
    id_esterilizador: number
}
export type MaterialEsterilizadorRequest = Omit<MaterialEsterilizador, 'id'>;
