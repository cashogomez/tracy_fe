import { SetEnviado } from "../set";
import { TicketOA } from "../ticketoa";

export interface TicketSetOA {
    id: number;
    cantidad : number;
    set : SetEnviado;
    ticket: TicketOA;
  }
  export type TicketSetOARequest = Omit<TicketSetOA, 'id'>;