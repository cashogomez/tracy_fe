import { Instrumento } from "../instrumento";
import { SetEnviado } from "../set";

export interface CantidadInstrumentoRequest {
    cantidad : number;
    instrumento : number;
    set: number;
}
export interface CantidadInstrumentoEnviado {
    id: number;
    cantidad : number;
    instrumento : Instrumento;
    set: SetEnviado;
}
