export interface Department {
  codigo: string;
  data: Department_Data[];
  mensagem: string;
}

export interface Department_Data {
  id: number;
  descricao: string;
  nome: string;
}
