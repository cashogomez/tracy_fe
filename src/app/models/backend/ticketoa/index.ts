export interface TicketOA {
    id: number;
    prioridad: Number
    area_prestamo:  string
    fecha_prestamo:  string
    recepcion_usuario:  string
    recepcion_usuario_recepcion:  string
    devolucion_usuario:  string
    entrega_usuario: string
    notas:  string
    estatus: string
  }
  export type TicketOARequest = Omit<TicketOA, 'id'>;
