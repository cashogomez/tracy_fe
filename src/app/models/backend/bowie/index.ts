export interface Bowie {
    id: number;
    idesterilizador: number;
    fecha: string
    clave: string
    verificador: boolean
  }
  export type BowieRequest = Omit<Bowie, 'id'>;


   