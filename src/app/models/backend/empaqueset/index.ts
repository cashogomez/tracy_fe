import { Empaque } from "../empaque";
import { SetEnviado } from "../set";

export interface EmpaqueSet {
    id: number;
    cantidad : number;
    empaque : Empaque;
    set: SetEnviado;
  }
  export type EmpaqueSetRequest = Omit<EmpaqueSet, 'id'>;