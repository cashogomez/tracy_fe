export interface MaterialEmpaque{
    id: number;
   nombre: string;
   marca: string;
   tiempo_vida: number;
   unidad: string;
}
export type MaterialEmpaqueRequest = Omit<MaterialEmpaque, 'id'>;
