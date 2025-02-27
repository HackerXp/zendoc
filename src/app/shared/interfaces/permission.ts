export interface Permission_Data {
    id?: number;
    descricao?: string;
    estado?: string;
}

export interface Permission {
    codigo: string;
    data: Permission_Data[];
    mensagem: string;
}