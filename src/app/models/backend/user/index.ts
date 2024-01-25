export interface User {
    email: string;
    username: string;
    token: Token;
    nombre: string;
    paterno: string;
    materno: string;
    telefono: string;
    foto: string;
}

interface Token {
    refresh: string;
    access: string;
}