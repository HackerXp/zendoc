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


export interface Data {
  categoria: string;
  data_criacao: string;
  data_elaboracao: string;
  departamento: string;
  descricao: string;
  files: File[];
  id: number;
  idcategoria: number;
  iddepartamento: number;
  idusuario: string;
  titulo: string;
  tags: string;
  tipo: string;
  usuario: string;
  visibilidade: "public" | "private" | "department";
}

export interface Documents {
  codigo: string;
  data: Data[];
  mensagem: string;
  total_paginas: number;
  pagina_atual: number;
  total_registros: number;
}


export interface File {
  idfiles: number;
  iddocumento: number;
  extension: string;
  size: string;
  nome: string;
  url: string
}
