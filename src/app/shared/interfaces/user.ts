export interface User {
    codigo: string;
    data: User_Data[];
    mensagem: string;
    pagina_atual: number;
    total_paginas: number;
    total_registros: number;
}


export interface User_Data {
    id?: number;
    idLogged?: number;
    iddepartamento?: number;
    nome: string;
    usuario: string;
    email: string;
}
