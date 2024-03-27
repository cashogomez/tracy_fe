interface Ticket {
    id: number;
    FechaCirugia: string;
    Paciente: string;
    Registro: string;
    Edad: number;
    FechaNacimiento: string;
    NoHabitacion: number;
    Sala: number;
    Turno: number;
    Diagnostico: string;
    Cirugia: string;
    Solicita: string;
    Cirujano: string;
    Anestesiologo: string;
    TipoAnestesia: string;
    Residente: string;
    AreaRegistro: string;
    Enfermero: string;
    NotasAdicionales: string;
    // prioridad 1 es alta, prioridad 2 es media, prioridad 3 es baja
    Prioridad: number;
    Notas: String;
    Activo: Boolean;
  }
  export type TicketRequest = Omit<Ticket, 'id'>;
