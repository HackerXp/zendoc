export interface User {
    codigo: string;
    data: User_Data[];
    mensagem: string;
}


export interface User_Data {
    id?: number;
    nome: string;
    usuario: string;
    email: string;
}
