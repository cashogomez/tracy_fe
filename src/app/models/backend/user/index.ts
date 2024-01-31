import { Puesto } from "@app/models/backend/puesto";
import { AreaTrabajo } from "@app/models/backend/area";

export interface User {
    email: string;
    username: string;
    token: Token;
    nombre: string;
    paterno: string;
    materno: string;
    telefono: string;
    foto: string;
    response: string;
    numeroEmpledo: string,
    puesto : Puesto,
    area : AreaTrabajo,
    empresa_id : string,
    is_admin : boolean,
    is_active : boolean,
    is_staff : boolean,
    is_superadmin : boolean,
}

interface Token {
    refresh: string;
    access: string;
}