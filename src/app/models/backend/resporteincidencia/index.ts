export interface ReporteIncidencia {
    id: number;
    lugar: string;
    fecha: string
    usuario: string
    turno: number;
    incidencia: string
    comentario: string
 
  }
  export type ReporteIncidenciaRequest = Omit<ReporteIncidencia, 'id'>;


  