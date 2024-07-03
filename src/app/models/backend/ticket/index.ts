export interface Ticket {
    id: number;
    fecha_cirugia: string;
    habitacion: number;
    paciente: string;
    sala: number;
    turno: number;
    registro: string;
    edad: number;
    fecha_nacimiento: string;
    diagnostico: string;
    cirugia: string;
    solicita: string;
    cirujano: string;
    anestesiologo: string;
    anestesia: string;
    residente: string;
    estatus: string;

    area_registro: string;
    enfermero: string;
        // prioridad 1 es alta, prioridad 2 es media, prioridad 3 es baja
    prioridad: number;
    notas: string;

    activo: Boolean;


    recepcion_usuario:  string
    recepcion_usuario_recepcion:  string
    devolucion_usuario:  string
    entrega_usuario: string
  }
  export type TicketRequest = Omit<Ticket, 'id'>;
