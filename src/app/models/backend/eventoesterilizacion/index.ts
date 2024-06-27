import { Ciclo } from "../ciclo"

export interface EventoEsterilizacion {
    id: number
    perfil_inicio: string
    hora_inicio: string
    fecha_inicio: string
    perfil_final: string
    hora_final: string
    fecha_final: string
    ciclo: Ciclo
    cicloDiario: number
    id_esterilizador:number
  
  }
  export type EventoEsterilizacionRequest = Omit<EventoEsterilizacion, 'id'>;
