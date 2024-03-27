import { Instrumento } from "../instrumento";
import { SetEnviado } from "../set";

export interface CantidadInstrumentoRequest {
    cantidad : number;
    instrumento : Instrumento;
    set: SetEnviado;
}
export interface CantidadInstrumentoEnviado {
    id: number;
    cantidad : number;
    instrumento : Instrumento;
    set: SetEnviado;
}
