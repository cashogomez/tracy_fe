export interface Instrumento {
    id: number;
    nombre: string;
    cantidad: number;
    familia: string;
    individuo: number;
    codigo_qr: string;
    uso: number;
    tipo: string;
    marca: string;  
    lote: string;
    caducidad: number;
    foto: string;
    descripcion: string;
    set: string;
    empaque: string;
    prelavado: boolean;
    completo: boolean;
    funcional: boolean;
    created: string;
    updated: string;
}
export type InstrumentoRequest = Omit<Instrumento, 'id'>;