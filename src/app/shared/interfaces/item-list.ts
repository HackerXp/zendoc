export interface ItemList {
  icon: string;
  title: string;
  description: string;
  total: number;
  type: 'Boletim' | 'Acta' | 'Boletim Ocorrencia' | undefined;
}
