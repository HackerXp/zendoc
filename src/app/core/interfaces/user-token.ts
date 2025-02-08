export interface UserToken {
  idusuario?: number;
  nome?: string;
  email?: string;
  permissoes?: Permissao[];
  sub?: string;
  iat?: string;
  exp?: string;
}

export interface Permissao {
  descricao?: string;
  id?: number;
  idusuario?: number;
  idpermissao?: number;
}