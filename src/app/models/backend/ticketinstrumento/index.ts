import { Instrumento } from "../instrumento";
import { Ticket } from "../ticket";

export interface TicketInstrumento {
    id: number;
    cantidad : number;
    instrumento : Instrumento;
    ticket: Ticket;
  }
  export type TicketInstrumentoRequest = Omit<TicketInstrumento, 'id'>;