export interface Category {
  codigo: string;
  data: Category_Data[];
  mensagem: string;
}

export interface Category_Data {
  id: number;
  descricao: string;
  categoria: string;
}
