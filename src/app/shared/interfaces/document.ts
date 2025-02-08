export interface Document {
    id?: number;
    type?: string;
    name?: string;
    subject?: string;
    date?: string;
    time?: string;
    size?: number;
    ext?: string;
    area?: string;
    user?: string;
}


export interface Documents {
    id: number;
    titulo: string;
    tipo: string;
    descricao: string;
    categoria: string;
    idcategoria: number;
    departamento: string;
    iddepartamento: number;
    tags: string;
    usuario: string;
    idusuario: string;
    data_criacao: string;
    files: File[];
}


export interface File {
    idfiles: number;
    iddocumento: number;
    extension: string;
    size: string;
    nome: string;
    url: string
}
