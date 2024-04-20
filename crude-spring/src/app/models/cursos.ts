import { Aula } from "./aula";

export interface Cursos {
  id?: number;
  nome: string;
  valor: number;
  categoria?: string
  aulas?: Aula[];
}
