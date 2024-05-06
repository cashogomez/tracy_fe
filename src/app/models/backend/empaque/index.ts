import { MaterialEmpaque } from "../admonempaques";
import { SetEnviado } from "../set";

export interface Empaque {
    id: number;
    realizados : number;
    codigo_qr : string;
    //  rojo = 30 % de los ultimos dias
    //  naranja = 40% de los siguientes dias
    //  amarillo = 30% de los primeros dias
    // la semaforizacion es para cada empaque
    created : string;
    update : string;
    
    materialempaque : MaterialEmpaque;
}
export type EmpaqueRequest = Omit<Empaque, 'id'>;
