export interface Paciente {
  cpf: string;
  nome: string;
  email: string;
  endereco: {};
  senha: string;
  telefone: string;
  possuiPlanoSaude: boolean;
  planosSaude?: number[];
  imagem?: string;
}

export interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  estado: string;
}
