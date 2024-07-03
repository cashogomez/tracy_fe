import { SetEnviado } from "../set";
import { Ticket } from "../ticket";

export interface TicketSet {
    id: number;
    cantidad : number;
    set : SetEnviado;
    ticket: Ticket;
    entregados: number;
  }
  export type TicketSetRequest = Omit<TicketSet, 'id'>;