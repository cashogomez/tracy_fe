import { Ciclo } from "../ciclo"
import { User } from "../user"

export interface EventoEsterilizacion {
    id: Number
    perfil_inicio: User
    hora_inicio: string
    fecha_inicio: string
    perfil_final: User
    hora_final: string
    fecha_final: string
    ciclo: Ciclo
    cicloDiario: Number
  
  }
  export type EventoEsterilizacionRequest = Omit<EventoEsterilizacion, 'id'>;
