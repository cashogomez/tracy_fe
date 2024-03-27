import { SetEnviado } from "../set";

export interface CantidadSetRequest {
    cantidad : number;
    set : SetEnviado;
}
export interface CantidadSetEnviado {
    id: number;
    cantidad : number;
    set : SetEnviado;
}
