import { EventoEsterilizacion } from "../eventoesterilizacion"

export interface MaterialEsterilizador {
    id: number
    setId: number
    nombreSet: string
    cantidad: number
    turno: number
    eventoEsterilizador: EventoEsterilizacion
}
export type MaterialEsterilizadorRequest = Omit<MaterialEsterilizador, 'id'>;
