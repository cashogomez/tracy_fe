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
    numeroEmpleado: string,
    puesto : string,
    area : string,
    empresa_id : string,
    is_admin : string,
    is_active : string,
    is_staff : string,
    is_superadmin : string,
}

interface Token {
    refresh: string;
    access: string;
}